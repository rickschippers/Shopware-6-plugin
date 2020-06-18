<?php declare(strict_types=1);

namespace Buckaroo\Shopware6\Helpers;

use Buckaroo\Shopware6\PaymentMethods\Ideal;
use Buckaroo\Shopware6\PaymentMethods\IdealProcessing;
use Buckaroo\Shopware6\PaymentMethods\Bancontact;
use Buckaroo\Shopware6\PaymentMethods\Creditcard;
use Buckaroo\Shopware6\PaymentMethods\Creditcards;
use Buckaroo\Shopware6\PaymentMethods\AfterPay;
use Buckaroo\Shopware6\PaymentMethods\Sofort;
use Buckaroo\Shopware6\PaymentMethods\Paypal;
use Buckaroo\Shopware6\PaymentMethods\Transfer;
use Buckaroo\Shopware6\PaymentMethods\ApplePay;
use Buckaroo\Shopware6\PaymentMethods\Giropay;
use Buckaroo\Shopware6\PaymentMethods\Kbc;
use Buckaroo\Shopware6\PaymentMethods\SepaDirectDebit;
use Buckaroo\Shopware6\PaymentMethods\Payconiq;
use Buckaroo\Shopware6\PaymentMethods\Giftcards;
use Buckaroo\Shopware6\PaymentMethods\Rtp;

class GatewayHelper
{
    public const GATEWAYS = [
        Ideal::class,
        IdealProcessing::class,
        Bancontact::class,
        Creditcard::class,
        Creditcards::class,
        AfterPay::class,
        Sofort::class,
        Paypal::class,
        Transfer::class,
        ApplePay::class,
        Giropay::class,
        Kbc::class,
        SepaDirectDebit::class,
        Payconiq::class,
        Giftcards::class,
        Rtp::class
    ];
}
