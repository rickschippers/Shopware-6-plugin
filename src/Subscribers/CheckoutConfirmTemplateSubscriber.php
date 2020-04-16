<?php declare(strict_types=1);

namespace Buckaroo\Shopware6\Subscribers;

use Buckaroo\Shopware6\Helpers\ApiHelper;
use Buckaroo\Shopware6\Helpers\BkrHelper;
use Buckaroo\Shopware6\Storefront\Struct\BuckarooStruct;
use Shopware\Core\Checkout\Customer\CustomerEntity;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Storefront\Page\Checkout\Confirm\CheckoutConfirmPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

use Shopware\Core\System\SalesChannel\Entity\SalesChannelRepositoryInterface;

class CheckoutConfirmTemplateSubscriber implements EventSubscriberInterface
{
    /** @var ApiHelper */
    private $apiHelper;
    private $bkrHelper;
    private $customerRepository;

    /**
     * @var SalesChannelRepositoryInterface
     */
    private $paymentMethodRepository;

    /**
     * @var array
     */
    protected $issuers = [
        [
            'name' => 'ABN AMRO',
            'code' => 'ABNANL2A',
        ],
        [
            'name' => 'ASN Bank',
            'code' => 'ASNBNL21',
        ],
        [
            'name' => 'Bunq Bank',
            'code' => 'BUNQNL2A',
        ],
        [
            'name' => 'ING',
            'code' => 'INGBNL2A',
        ],
        [
            'name' => 'Knab Bank',
            'code' => 'KNABNL2H',
        ],
        [
            'name' => 'Moneyou',
            'code' => 'MOYONL21',
        ],
        [
            'name' => 'Rabobank',
            'code' => 'RABONL2U',
        ],
        [
            'name' => 'RegioBank',
            'code' => 'RBRBNL21',
        ],
        [
            'name' => 'SNS Bank',
            'code' => 'SNSBNL2A',
        ],
        [
            'name' => 'Triodos Bank',
            'code' => 'TRIONL2U',
        ],
        [
            'name' => 'Van Lanschot',
            'code' => 'FVLBNL22',
        ],
        [
            'name' => 'Handelsbanken',
            'code' => 'HANDNL2A',
        ],
    ];

    protected $issuers_processing = [
        'mastercard' => 'MasterCard',
        'visa' => 'Visa',
        'amex' => 'American Express',
        'vpay' => 'VPay',
        'maestro' => 'Maestro',
        'visaelectron' => 'Visa Electron',
        'cartebleuevisa' => 'Carte Bleue',
        'cartebancaire' => 'Carte Bancaire',
        'dankort' => 'Dankort',
        'nexi' => 'Nexi'
    ];


    /**
     * CheckoutConfirmTemplateSubscriber constructor.
     * @param ApiHelper $apiHelper
     * @param BkrHelper $bkrHelper
     * @param EntityRepositoryInterface $customerRepository
     * @param SalesChannelRepositoryInterface $paymentMethodRepository
     */
    public function __construct(
        ApiHelper $apiHelper,
        BkrHelper $bkrHelper,
        EntityRepositoryInterface $customerRepository,
        SalesChannelRepositoryInterface $paymentMethodRepository
    ) {
        $this->apiHelper = $apiHelper;
        $this->bkrHelper = $bkrHelper;
        $this->customerRepository = $customerRepository;
        $this->paymentMethodRepository = $paymentMethodRepository;
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents(): array
    {
        return [
            CheckoutConfirmPageLoadedEvent::class => 'addBuckarooExtension'
        ];
    }

    /**
     * @param CheckoutConfirmPageLoadedEvent $event
     * @throws \Exception
     */
    public function addBuckarooExtension(CheckoutConfirmPageLoadedEvent $event): void
    {
        $request = $this->bkrHelper->getGlobals();
        $customer = $event->getSalesChannelContext()->getCustomer();

        $issuer = $request->get('issuer');
        $issuer_processing = $request->get('issuer2');
        $creditcard = $request->get('creditcard');
        
        if ($issuer) {
            $this->customerRepository->upsert(
                [[
                    'id' => $customer->getId(),
                    'customFields' => [
                        'last_used_issuer' => $issuer,
                        'last_used_issuer_processing' => $issuer_processing,
                        'last_used_creditcard' => $creditcard]
                ]],
                $event->getContext()
            );
            $customer = $this->getCustomer($customer->getId(), $event->getContext());
        }

        $struct = new BuckarooStruct();
        $issuers = $this->issuers;
        $lastUsedIssuer = $customer->getCustomFields()['last_used_issuer'];
        $lastUsedIssuerProcessing = $customer->getCustomFields()['last_used_issuer_processing'];
        $lastUsedCreditcard = $customer->getCustomFields()['last_used_creditcard'];

        $allowedcreditcards = $this->apiHelper->getSettingsValue('allowedcreditcards');
        foreach ($allowedcreditcards as $key => $value) {
            $creditcards[] = [
                'name' => $this->issuers_processing[$value],
                'code' => $value
            ];
        }

        $criteria = (new Criteria())
            ->addFilter(new EqualsFilter('active', true))
            ->addAssociation('media');
        /** @var PaymentMethodCollection $paymentMethods */
        $paymentMethods = $this->paymentMethodRepository->search($criteria, $event->getSalesChannelContext())->getEntities();
        foreach ($paymentMethods as $key => $paymentMethod) {
            $customFields = $paymentMethod->getCustomFields();
            $payment_labels[$paymentMethod->getName()] = $this->apiHelper->getSettingsValue($customFields['buckaroo_key'] . 'Label');
        }

        $struct->assign([
            'issuers' => $issuers,
            'last_used_issuer' => $lastUsedIssuer,
            'last_used_issuer_processing' => $lastUsedIssuerProcessing,
            'payment_method_name' => $this->getPaymentMethodName($issuers, $lastUsedIssuer, $this->apiHelper->getSettingsValue('idealLabel')),
            'payment_method_name_processing' => $this->getPaymentMethodName($issuers, $lastUsedIssuerProcessing, $this->apiHelper->getSettingsValue('idealprocessingLabel')),
            'payment_method_name_card' => $this->getPaymentMethodName($creditcards, $lastUsedCreditcard, $this->apiHelper->getSettingsValue('creditcardsLabel')),
            'creditcards' => $creditcards,
            'last_used_creditcard' => $lastUsedCreditcard,
            'payment_labels' => $payment_labels,
        ]);

        $event->getPage()->addExtension(
            BuckarooStruct::EXTENSION_NAME,
            $struct
        );
    }

    /**
     * @param string $customerId
     * @param Context $context
     * @return CustomerEntity
     * @throws \Shopware\Core\Framework\DataAbstractionLayer\Exception\InconsistentCriteriaIdsException
     */
    private function getCustomer(string $customerId, Context $context): CustomerEntity
    {
        $criteria = (new Criteria())->addFilter(new EqualsFilter('id', $customerId));
        return $this->customerRepository->search($criteria, $context)->first();
    }

    /**
     * @param array $issuers
     * @param string|null $lastUsedIssuer
     * @param name
     * @return string
     */
    private function getPaymentMethodName(array $issuers, ?string $lastUsedIssuer, $name): string
    {
        foreach ($issuers as $issuer) {
            if ($issuer['code'] === $lastUsedIssuer) {
                $issuerName = $issuer['name'];
                return $name.' ('.$issuerName.')';
            }
        }
        return $name;
    }
}
