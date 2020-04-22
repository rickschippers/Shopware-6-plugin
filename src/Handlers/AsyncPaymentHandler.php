<?php declare(strict_types=1);

namespace Buckaroo\Shopware6\Handlers;

use Exception;
use Buckaroo\Shopware6\Helpers\Helper;
use Buckaroo\Shopware6\Helpers\CheckoutHelper;
use Shopware\Core\Checkout\Payment\Cart\AsyncPaymentTransactionStruct;
use Shopware\Core\Checkout\Payment\Cart\PaymentHandler\AsynchronousPaymentHandlerInterface;
use Shopware\Core\Checkout\Payment\Exception\AsyncPaymentFinalizeException;
use Shopware\Core\Checkout\Payment\Exception\AsyncPaymentProcessException;
use Shopware\Core\Checkout\Payment\Exception\CustomerCanceledAsyncPaymentException;
use Shopware\Core\Framework\DataAbstractionLayer\Exception\InconsistentCriteriaIdsException;
use Shopware\Core\Framework\Validation\DataBag\RequestDataBag;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\StateMachine\Exception\IllegalTransitionException;
use Shopware\Core\System\StateMachine\Exception\StateMachineNotFoundException;
use Shopware\Core\System\StateMachine\Exception\StateMachineStateNotFoundException;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

use Buckaroo\Shopware6\Buckaroo\Payload\TransactionRequest;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;


class AsyncPaymentHandler implements AsynchronousPaymentHandlerInterface
{
    /** @var Helper $helper */
    public $helper;
    /** @var CheckoutHelper $checkoutHelper */
    public $checkoutHelper;

    /**
     * Buckaroo constructor.
     * @param Helper $helper
     * @param CheckoutHelper $checkoutHelper
     */
    public function __construct(
        Helper $helper,
        CheckoutHelper $checkoutHelper
    ) {
        $this->helper = $helper;
        $this->checkoutHelper = $checkoutHelper;
    }

    /**
     * @param AsyncPaymentTransactionStruct $transaction
     * @param RequestDataBag $dataBag
     * @param SalesChannelContext $salesChannelContext
     * @param string|null $gateway
     * @param string $type
     * @param array $gatewayInfo
     * @return RedirectResponse
     * @throws AsyncPaymentProcessException
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function pay(
        AsyncPaymentTransactionStruct $transaction,
        RequestDataBag $dataBag,
        SalesChannelContext $salesChannelContext,
        string $gateway = null,
        string $type = 'redirect',
        array $gatewayInfo = []
    ): RedirectResponse {

        $bkrClient = $this->helper->initializeBkr();

        $order = $transaction->getOrder();
        $customer = $salesChannelContext->getCustomer();
        $request = $this->helper->getGlobals();

        $request = new TransactionRequest;

        $finalize_page = $this->checkoutHelper->getReturnUrl('buckaroo.payment.finalize');

        $request->setDescription('Payment for order #' . $order->getOrderNumber());
        $request->setReturnURL($finalize_page);
        $request->setReturnURLCancel(sprintf('%s?cancel=1', $finalize_page));
        $request->setPushURL($this->checkoutHelper->getReturnUrl('buckaroo.payment.push'));
        
        $request->setAdditionalParameter('orderTransactionId', $transaction->getOrderTransaction()->getId());
        $request->setAdditionalParameter('orderId', $order->getId());

        $request->setInvoice($order->getOrderNumber());
        $request->setOrder($order->getOrderNumber());
        $request->setCurrency($salesChannelContext->getCurrency()->getIsoCode());
        $request->setAmountDebit($order->getAmountTotal());

        $request->setServiceName($gatewayInfo['key']);
        $request->setServiceVersion($gatewayInfo['version']);
        $request->setServiceAction('Pay');

        if($issuer = $dataBag->get('bankMethodId')){
            $request->setServiceParameter('issuer', $issuer);
        }

        if($card = $gatewayInfo['creditcard']){
            $request->setServiceName($card);
        }

        if($additional = $gatewayInfo['additional']){
            foreach ($additional as $key2 => $item) {
                foreach ($item as $key => $value) {
                    $request->setServiceParameter($value['Name'], $value['_'], $value['Group'], $value['GroupID']);
                }
            }
        }

        try {
            $url = $this->checkoutHelper->getTransactionUrl($gatewayInfo['key']);
            $response = $bkrClient->post($url, $request, 'Buckaroo\Shopware6\Buckaroo\Payload\TransactionResponse');
        } catch (Exception $exception) {
            throw new AsyncPaymentProcessException(
                $transaction->getOrderTransaction()->getId(),
                $exception->getMessage()
            );
        }
        
        if($response->isSuccess() || $response->isAwaitingConsumer()){
            return new RedirectResponse('/checkout/finish?orderId=' . $order->getId());
        }elseif($response->hasRedirect()) {
            return new RedirectResponse($response->getRedirectUrl());
        }elseif($response->isCanceled()){
            throw new CustomerCanceledAsyncPaymentException(
            $transaction->getOrderTransaction()->getId(),
            ''
            );
        }

        return new RedirectResponse($finalize_page . '?orderId='.$order->getId().'&error=' . base64_encode($response->getSubCodeMessage()));

/*        throw new AsyncPaymentFinalizeException(
            $transaction->getOrderTransaction()->getId(),
            $response->getSubCodeMessage()
        );*/

    }

    /**
     * @param AsyncPaymentTransactionStruct $transaction
     * @param Request $request
     * @param SalesChannelContext $salesChannelContext
     * @throws AsyncPaymentFinalizeException
     * @throws CustomerCanceledAsyncPaymentException
     */
    /**
     * 
     * @Route("/example/route", name="example.route", defaults={"csrf_protected"=false}, methods={"POST"})
    */
    public function finalize(
        AsyncPaymentTransactionStruct $transaction,
        Request $request,
        SalesChannelContext $salesChannelContext
    ): void {

    }
}
