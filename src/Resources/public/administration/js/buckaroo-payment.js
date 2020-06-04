(this.webpackJsonp=this.webpackJsonp||[]).push([["buckaroo-payment"],{"2Glv":function(t,e){const{Application:n}=Shopware,o=Shopware.Classes.ApiService;class a extends o{constructor(t,e,n="buckaroo"){super(t,e,n)}getBuckarooTransaction(t){const e=`_action/${this.getApiBasePath()}/getBuckarooTransaction`;return this.httpClient.post(e,{transaction:t},{headers:this.getBasicHeaders()}).then(t=>o.handleResponse(t))}refundPayment(t,e,n){const a=`_action/${this.getApiBasePath()}/refund`;return this.httpClient.post(a,{transaction:t,transactionsToRefund:e,orderItems:n},{headers:this.getBasicHeaders()}).then(t=>o.handleResponse(t))}}n.addServiceProvider("BuckarooPaymentService",t=>{const e=n.getContainer("init");return new a(e.httpClient,t.loginService)})},"2p9Z":function(t,e,n){var o=n("Y4wM");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n("SZ7m").default)("31b09f66",o,!0,{})},"4kjK":function(t,e,n){},"6lJh":function(t,e,n){},CE1z:function(t){t.exports=JSON.parse('{"buckaroo-payment":{"order":{"refundDescription":"Terugbetaling voor bestelling #orderNumber"},"general":{"title":"Buckaroo","description":"Buckaroo Payment"},"settingsForm":{"save":"Opslaan","titleSuccess":"Succes","titleError":"Fout"},"supportModal":{"menuButton":"Ondersteuning van de versie","title":"Ondersteuning van de versie","support":{"description":"Voordat u contact opneemt met Buckaroo technische ondersteuning, kunt u uw (Merchant) sleutel, geheime sleutel, certificaat en certificaat duimafdruk ophalen.","label1":"Buckaroo Payment Plaza:","label2":"Telefoon:","label3":"E-mail:","label4":"Website:","your_version":"Uw PHP versie:","version":"Verenigbaarheid van versie","information":"Informatie"}},"tabs":{"title":"Buckaroo Payment","overview":"Overzicht"},"refund":{"amountTitle":"Bedrag","buttonTitle":"Terugbetaling","successTitle":"Succes","successMessage":"Buckaroo succes terugbetaald ","errorTitle":"Fout"},"messageNotBlank":"Dit veld mag niet leeg zijn."}}')},"Cz+n":function(t){t.exports=JSON.parse('{"buckaroo-payment":{"order":{"refundDescription":"Refund for order #orderNumber"},"general":{"title":"Buckaroo","description":"Buckaroo Payment"},"settingsForm":{"save":"Save","titleSuccess":"Success","titleError":"Error"},"supportModal":{"menuButton":"Version & Support","title":"Version & Support","support":{"description":"Before contacting Buckaroo technical support, please retrieve your (Merchant) key, Secret key, certificate and certificate thumbprint.","label1":"Buckaroo Payment Plaza:","label2":"Phone:","label3":"E-mail:","label4":"Website:","your_version":"Your PHP version:","version":"Version compatibility","information":"Information"}},"tabs":{"title":"Buckaroo Payment","overview":"Overview"},"paymentDetail":{"refundTitle":"Refund","transactionsTitle":"Transactions","amountTitle":"Amount","amountTotalTitle":"Grand total","buttonTitle":"Refund","successTitle":"Success","successMessage":"Buckaroo success refunded ","errorTitle":"Error"},"orderItems":{"title":"Items to Refund","types":{"id":"id","name":"Title","quantity":"Qty to Refund","totalAmount":"Subtotal"}},"transactionsToRefund":{"title":"Refund Totals"},"transactionHistory":{"types":{"id":"id","created_at":"Date/time","total":"Total","shipping_costs":"Shipping costs","total_excluding_vat":"Total excluding VAT","total_including_vat":"Total including VAT","vat":"VAT","transaction_key":"Transaction key","transaction_method":"Payment method"}},"messageNotBlank":"This field must not be empty."}}')},MKSE:function(t){t.exports=JSON.parse('{"buckaroo-payment":{"order":{"refundDescription":"Erstattung für Bestellung #orderNumber"},"general":{"title":"Buckaroo","description":"Buckaroo Payment"},"settingsForm":{"save":"Speichern","titleSuccess":"Erfolg","titleError":"Fehler"},"supportModal":{"menuButton":"Version & Support","title":"Version & Support","support":{"description":"Bevor Sie den technischen Support von Buckaroo kontaktieren, rufen Sie bitte Ihren (Merchant) Schlüssel, Geheimschlüssel, Zertifikat und Zertifikat-Daumenabdruck auf.","label1":"Buckaroo Payment Plaza:","label2":"Telefon:","label3":"E-mail:","label4":"Webseite:","your_version":"Ihre PHP Version:","version":"Kompatibilität der Version","information":"Information"}},"tabs":{"title":"Buckaroo Payment","overview":"Overview"},"refund":{"amountTitle":"Betrag","buttonTitle":"Erstattung","successTitle":"Erfolg","successMessage":"Buckaroo erfolg zurückerstattet","errorTitle":"Fehler"},"messageNotBlank":"Dieses Feld darf nicht leer sein."}}')},"Uf7/":function(t,e,n){var o=n("4kjK");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n("SZ7m").default)("ef5b552a",o,!0,{})},Vrcm:function(t,e){t.exports="{% block sw_plugin_list_grid_columns_actions_settings %}\n    <template v-if=\"item.composerName === 'buckaroo/shopware6'\">\n        <sw-context-menu-item :routerLink=\"{ name: 'buckaroo.payment.index' }\">\n            {{ $tc('sw-plugin.list.config') }}\n        </sw-context-menu-item>\n    </template>\n\n    <template v-else>\n        {% parent %}\n    </template>\n{% endblock %}\n"},Y4wM:function(t,e,n){},YZ49:function(t,e){t.exports='{% block sw_order_detail_content_tabs_general %}\n    {% parent %}\n\n    <sw-tabs-item v-if="setIsBuckarooPayment" :route="{ name: \'buckaroo.payment.detail\', params: { id: $route.params.id } }" :title="$tc(\'buckaroo-payment.tabs.title\')">\n        {{ $tc(\'buckaroo-payment.tabs.title\') }}\n    </sw-tabs-item>\n    \n{% endblock %}\n\n{% block sw_order_detail_actions %}\n    <template v-if="isEditable">\n        {% parent %}\n    </template>\n{% endblock %}'},czOy:function(t,e){const{Application:n}=Shopware,o=Shopware.Classes.ApiService;class a extends o{constructor(t,e,n="buckaroo"){super(t,e,n)}getSupportVersion(){const t=`_action/${this.getApiBasePath()}/support/version`;return this.httpClient.post(t,{},{headers:this.getBasicHeaders()}).then(t=>o.handleResponse(t))}}n.addServiceProvider("BuckarooPaymentSettingsService",t=>{const e=n.getContainer("init");return new a(e.httpClient,t.loginService)})},jtnP:function(t,e){t.exports='{% block buckaroo_payment %}\n<sw-page class="buckaroo-payment">\n    {% block buckaroo_payment_header %}\n    <template #smart-bar-header>\n        <h2>\n            {{ $tc(\'sw-settings.index.title\') }}\n            <sw-icon name="small-arrow-medium-right" small></sw-icon>\n            {{ $tc(\'buckaroo-payment.general.title\') }}\n        </h2>\n    </template>\n    {% endblock %}\n\n    {% block buckaroo_payment_actions %}\n    <template #smart-bar-actions>\n        {% block buckaroo_payment_settings_actions_feedback %}\n        <sw-button\n                @click="isSupportModalOpen = true"\n                :disabled="false"\n                variant="ghost"\n                :square="false"\n                :block="false"\n                :isLoading="false">\n            {{ $tc(\'buckaroo-payment.supportModal.menuButton\') }}\n        </sw-button>\n        {% endblock %}\n\n        {% block buckaroo_payment_settings_actions_save %}\n        <sw-button-process\n                class="sw-settings-login-registration__save-action"\n                :isLoading="isLoading"\n                :processSuccess="isSaveSuccessful"\n                :disabled="isLoading"\n                variant="primary"\n                @process-finish="saveFinish"\n                @click="onSave">\n            {{ $tc(\'buckaroo-payment.settingsForm.save\') }}\n        </sw-button-process>\n        {% endblock %}\n    </template>\n    {% endblock %}\n\n    {% block buckaroo_payment_settings_content %}\n    <template #content>\n        <sw-modal\n                v-if="isSupportModalOpen"\n                @modal-close="isSupportModalOpen = false"\n                :title="$tc(\'buckaroo-payment.supportModal.title\')"\n                class="buckaroo-feedback sw-modal--large">\n            <sw-container columns="1fr">\n                <div class="buckaroo-feedback__col">\n                    <p class="buckaroo-feedback__desc">\n                        <a href="https://buckaroo.nl/" target="_blank">\n                            <img src="/bundles/buckaroopayment/storefront/buckaroo/logo/buckaroo_config_logo_black.png" >\n                        </a>\n                    </p>\n                </div>\n            </sw-container>\n\n            <sw-container columns="1fr 1fr">\n                <div class="buckaroo-feedback__col">\n                    <p class="buckaroo-feedback__desc">\n                        <h3>{{ $tc(\'buckaroo-payment.supportModal.support.version\') }}</h3>\n                        \n                        <div class="row">\n                            <div class="column">{{ $tc(\'buckaroo-payment.supportModal.support.your_version\') }}</div>\n                            <div class="column">{{ phpversion }}\n                                <sw-icon v-if="isPhpVersionSupport" name="default-basic-checkmark-line" color="#37d046"></sw-icon>\n                                <sw-icon v-else name="default-basic-x-line" color="#de294c"></sw-icon>\n                            </div>\n                        </div>\n                    </p>\n                </div>\n\n                <div class="buckaroo-feedback__col">\n                    <p class="buckaroo-feedback__desc">\n                        <h3>{{ $tc(\'buckaroo-payment.supportModal.support.information\') }}</h3>\n                        <p>{{ $tc(\'buckaroo-payment.supportModal.support.description\') }} <br><br></p>\n  \n                        <div class="row">\n                            <div class="column">{{ $tc(\'buckaroo-payment.supportModal.support.label1\') }}</div>\n                            <div class="column"><a target="_blank" href="https://plaza.buckaroo.nl/">plaza.buckaroo.nl</a></div>\n                        </div>\n\n                        <div class="row">\n                            <div class="column">{{ $tc(\'buckaroo-payment.supportModal.support.label2\') }}</div>\n                            <div class="column">+31(0)30-711 50 50</div>\n                        </div>\n\n                        <div class="row">\n                            <div class="column">{{ $tc(\'buckaroo-payment.supportModal.support.label3\') }}</div>\n                            <div class="column"><a href="mailto:support@buckaroo.nl">support@buckaroo.nl</a></div>\n                        </div>\n\n                        <div class="row">\n                            <div class="column">{{ $tc(\'buckaroo-payment.supportModal.support.label4\') }}</div>\n                            <div class="column"><a href="https://buckaroo.nl/" target="_blank">buckaroo.nl</a></div>\n                        </div>\n                    </p>\n                </div>\n            </sw-container>\n        </sw-modal>\n\n        <sw-card-view>\n            <sw-system-config\n                    ref="systemConfig"\n                    salesChannelSwitchable\n                    inherit\n                    @config-changed="onConfigChange"\n                    domain="BuckarooPayment.config">\n                <template #card-element="{ element, config }">\n                    <sw-form-field-renderer\n                            v-bind="getBind(element, config)"\n                            v-model="config[element.name]"/>\n                </template>\n            </sw-system-config>\n        </sw-card-view>\n    </template>\n    {% endblock %}\n</sw-page>\n{% endblock %}\n'},pLZ4:function(t,e,n){"use strict";n.r(e);var o=n("jtnP"),a=n.n(o);n("Uf7/");const{Component:s,Mixin:r}=Shopware;s.register("buckaroo-settings",{template:a.a,mixins:[r.getByName("notification"),r.getByName("sw-inline-snippet")],inject:["BuckarooPaymentSettingsService"],data:()=>({isLoading:!1,isSaveSuccessful:!1,config:{},websiteKeyIdFilled:!1,secretKeyIdFilled:!1,showValidationErrors:!1,phpversion:!1,isSupportModalOpen:!1,isPhpVersionSupport:!1}),created(){var t=this;this.createdComponent(),this.BuckarooPaymentSettingsService.getSupportVersion().then(e=>{t.phpversion=e.phpversion,t.isPhpVersionSupport=e.isPhpVersionSupport})},computed:{credentialsMissing:function(){return!this.websiteKeyIdFilled||!this.secretKeyIdFilled}},metaInfo(){return{title:this.$createTitle()}},methods:{createdComponent(){},saveFinish(){this.isSaveSuccessful=!1},onConfigChange(t){this.config=t,this.checkCredentialsFilled(),this.showValidationErrors=!1},checkCredentialsFilled(){this.websiteKeyIdFilled=!!this.getConfigValue("websiteKey"),this.secretKeyIdFilled=!!this.getConfigValue("secretKey")},getConfigValue(t){const e=this.$refs.systemConfig.actualConfigData.null;return null===this.$refs.systemConfig.currentSalesChannelId?this.config[`BuckarooPayment.config.${t}`]:this.config[`BuckarooPayment.config.${t}`]||e[`BuckarooPayment.config.${t}`]},getPaymentConfigValue(t,e){let n=t.charAt(0).toUpperCase()+t.slice(1);return this.getConfigValue(e+n)||this.getConfigValue(t)},onSave(){this.credentialsMissing?this.showValidationErrors=!0:(this.isSaveSuccessful=!1,this.isLoading=!0,this.$refs.systemConfig.saveAll().then(()=>{this.isLoading=!1,this.isSaveSuccessful=!0}).catch(()=>{this.isLoading=!1}))},getBind(t,e){return e!==this.config&&this.onConfigChange(e),this.showValidationErrors&&("BuckarooPayment.config.websiteKey"!==t.name||this.websiteKeyIdFilled||(t.config.error={code:1,detail:this.$tc("buckaroo-payment.messageNotBlank")}),"BuckarooPayment.config.secretKey"!==t.name||this.websiteKeyIdFilled||(t.config.error={code:1,detail:this.$tc("buckaroo-payment.messageNotBlank")})),t}}});var i=n("YZ49"),c=n.n(i);const{Component:l,Context:u}=Shopware,d=Shopware.Data.Criteria;l.override("sw-order-detail",{template:c.a,data:()=>({isBuckarooPayment:!1}),computed:{isEditable(){return!this.isBuckarooPayment||"buckaroo.payment.detail"!==this.$route.name},showTabs:()=>!0},watch:{orderId:{deep:!0,handler(){if(!this.orderId)return void this.setIsBuckarooPayment(null);const t=this.repositoryFactory.create("order"),e=new d(1,1);e.addAssociation("transactions"),t.get(this.orderId,u.api,e).then(t=>{if(t.transactions.length<=0||!t.transactions[0].paymentMethodId)return void this.setIsBuckarooPayment(null);const e=t.transactions[0].paymentMethodId;null!=e&&this.setIsBuckarooPayment(e)})},immediate:!0}},methods:{setIsBuckarooPayment(t){if(!t)return;this.repositoryFactory.create("payment_method").get(t,u.api).then(t=>{this.isBuckarooPayment=t.formattedHandlerIdentifier.indexOf("buckaroo")>=0})}}});var p=n("Vrcm"),m=n.n(p);const{Component:h}=Shopware;h.override("sw-plugin-list",{template:m.a});var b=n("q+HN"),g=n.n(b);n("qDl2");const{Component:k}=Shopware;k.override("sw-settings-index",{template:g.a});var y=n("wlgm"),f=n.n(y);n("2p9Z");const{Component:v,Mixin:w,Filter:_,Context:S}=Shopware,B=Shopware.Data.Criteria;v.register("buckaroo-payment-detail",{template:f.a,inject:["repositoryFactory","BuckarooPaymentService"],mixins:[w.getByName("notification")],data:()=>({buckaroo_refund_amount:"0",currency:"EUR",isRefundPossible:!0,isLoading:!1,order:!1,buckarooTransactions:null,orderItems:[],transactionsToRefund:[],relatedResources:[]}),computed:{orderItemsColumns(){return[{property:"name",label:this.$tc("buckaroo-payment.orderItems.types.name"),rawData:!0},{property:"quantity",label:this.$tc("buckaroo-payment.orderItems.types.quantity"),rawData:!0},{property:"totalAmount",label:this.$tc("buckaroo-payment.orderItems.types.totalAmount"),rawData:!0}]},transactionsToRefundColumns:()=>[{property:"transaction_method",rawData:!0},{property:"amount",rawData:!0}],relatedResourceColumns(){return[{property:"created_at",label:this.$tc("buckaroo-payment.transactionHistory.types.created_at"),rawData:!0},{property:"total",label:this.$tc("buckaroo-payment.transactionHistory.types.total"),rawData:!0},{property:"shipping_costs",label:this.$tc("buckaroo-payment.transactionHistory.types.shipping_costs"),rawData:!0},{property:"total_excluding_vat",label:this.$tc("buckaroo-payment.transactionHistory.types.total_excluding_vat"),rawData:!0},{property:"vat",label:this.$tc("buckaroo-payment.transactionHistory.types.vat"),rawData:!0},{property:"transaction_key",label:this.$tc("buckaroo-payment.transactionHistory.types.transaction_key"),rawData:!0},{property:"transaction_method",label:this.$tc("buckaroo-payment.transactionHistory.types.transaction_method"),rawData:!0}]}},created(){this.createdComponent()},methods:{recalculateOrderItems(){this.buckaroo_refund_amount=0;for(const t in this.orderItems)this.orderItems[t].totalAmount=parseFloat(parseFloat(this.orderItems[t].unitPrice)*parseFloat(this.orderItems[t].quantity)).toFixed(2),this.buckaroo_refund_amount=parseFloat(parseFloat(this.buckaroo_refund_amount)+parseFloat(this.orderItems[t].totalAmount)).toFixed(2)},createdComponent(){let t=this;const e=this.$route.params.id,n=this.repositoryFactory.create("order"),o=new B(1,1);this.orderId=e,o.addAssociation("transactions"),n.get(e,S.api,o).then(t=>{}),this.BuckarooPaymentService.getBuckarooTransaction(e).then(e=>{e.orderItems.forEach(e=>{t.orderItems.push({id:e.id,name:e.name,quantity:e.quantity,quantityMax:e.quantity,unitPrice:e.unitPrice.value,totalAmount:e.totalAmount.value}),console.log("that.buckaroo_refund_amount",t.buckaroo_refund_amount)}),t.recalculateOrderItems(),e.transactionsToRefund.forEach(e=>{t.transactionsToRefund.push({id:e.id,transactions:e.transactions,amount:e.total,amountMax:e.total,transaction_method:e.transaction_method,logo:e.transaction_method?e.logo:null})}),e.transactions.forEach(e=>{t.relatedResources.push({id:e.id,transaction_key:e.transaction,total:e.total,total_excluding_vat:e.total_excluding_vat,shipping_costs:e.shipping_costs,vat:e.vat,transaction_method:e.transaction_method,logo:e.transaction_method?e.logo:null,created_at:e.created_at})})}).catch(t=>{console.log("errorResponse",t)})},refundOrder(t,e){let n=this;n.isRefundPossible=!1,this.BuckarooPaymentService.refundPayment(t,this.transactionsToRefund,this.orderItems).then(t=>{for(const e in t)t[e].status?this.createNotificationSuccess({title:n.$tc("buckaroo-payment.settingsForm.titleSuccess"),message:t[e].message}):this.createNotificationError({title:n.$tc("buckaroo-payment.settingsForm.titleError"),message:t[e].message});n.isRefundPossible=!0}).catch(t=>{this.createNotificationError({title:this.$tc("buckaroo-payment.settingsForm.titleError"),message:t.response.data.message}),n.isRefundPossible=!0})}}});var P=n("CE1z"),C=n("MKSE"),T=n("Cz+n");const{Module:x}=Shopware;x.register("buckaroo-payment",{type:"plugin",name:"BuckarooPayment",title:"buckaroo.general.title",description:"buckaroo.general.description",version:"1.0.0",targetVersion:"1.0.0",color:"#000000",icon:"default-action-settings",snippets:{"nl-NL":P,"de-DE":C,"en-GB":T},routeMiddleware(t,e){"sw.order.detail"===e.name&&e.children.push({component:"buckaroo-payment-detail",name:"buckaroo.payment.detail",isChildren:!0,path:"/sw/order/buckaroo/detail/:id"}),t(e)},routes:{index:{component:"buckaroo-settings",path:"index",meta:{parentPath:"sw.settings.index"}}}});n("2Glv"),n("czOy")},"q+HN":function(t,e){t.exports='{% block sw_settings_content_card_slot_plugins %}\n    {% parent %}\n\n    <sw-settings-item :label="$tc(\'buckaroo-payment.general.title\')"\n                      :to="{ name: \'buckaroo.payment.index\' }"\n                      :backgroundEnabled="false">\n        <template #icon>\n            <img class="sw-settings-index__buckaroo-icon" :src="\'buckaroopayment/plugin.png\' | asset">\n        </template>\n    </sw-settings-item>\n{% endblock %}\n'},qDl2:function(t,e,n){var o=n("6lJh");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n("SZ7m").default)("0736a430",o,!0,{})},wlgm:function(t,e){t.exports='{% block buckaroo_payment_detail %}\n    <div class="buckaroo-payment-detail">\n        \n         <sw-card :title="$tc(\'buckaroo-payment.paymentDetail.refundTitle\')">\n            \n            {{ $tc(\'buckaroo-payment.orderItems.title\') }}\n            <sw-data-grid :dataSource="orderItems"\n                :columns="orderItemsColumns"\n                :showActions="false"\n                :showSelection="false">\n\n                    <template #column-quantity="{ item }">\n                        <input type="number" min="0" :max="item.quantityMax" v-model="item.quantity" @input="recalculateOrderItems">\n                    </template>\n\n            </sw-data-grid>\n\n            <sw-card-section divider="top" secondary slim>\n                <sw-container columns="1fr 440px"\n                              class="sw-order-detail__summary">\n                    <sw-description-list grid="265px 1fr" class="sw-order-detail__summary-data">\n                            <dt>{{ $tc(\'buckaroo-payment.transactionsToRefund.title\') }}</dt>\n                            <dd></dd>\n\n                    </sw-description-list>\n                </sw-container>\n\n                <sw-data-grid :dataSource="transactionsToRefund"\n                    :columns="transactionsToRefundColumns"\n                    :showHeader="false"\n                    :showActions="false"\n                    :showSelection="false">\n\n                        <template #column-transaction_method="{ item }">\n                            <img :src="\'/bundles/buckaroopayment/storefront/buckaroo/logo/\'+item.transaction_method + \'.png\'" class="transaction-method-logo" width=20  :title="item.transaction_method">\n                                {{ item.transaction_method }}\n                        </template>\n\n                        <template #column-amount="{ item }">\n                            <input type="number" min="0" :max="item.amountMax" v-model="item.amount" >\n                        </template>\n\n                </sw-data-grid>\n\n                <sw-container columns="1fr 440px" class="sw-order-detail__summary">\n                    <sw-description-list grid="265px 1fr" class="sw-order-detail__summary-data">\n                            <dt>{{ $tc(\'buckaroo-payment.paymentDetail.amountTotalTitle\') }}: </dt>\n                            <dd>{{ buckaroo_refund_amount }}  {{ currency }}</dd>\n\n                    </sw-description-list>\n                </sw-container>\n                 \n            </sw-card-section>\n\n            <sw-container columns="1fr 440px" class="sw-order-detail__summary">\n                <sw-description-list grid="265px 1fr" class="sw-order-detail__summary-data"><dt></dt><dd>\n                    <sw-button @click="refundOrder(orderId, buckaroo_refund_amount)" :disabled="!isRefundPossible">\n                    {{ $tc(\'buckaroo-payment.paymentDetail.buttonTitle\') }}\n                    </sw-button></dd>\n                </sw-description-list>\n            </sw-container>\n\n         </sw-card>\n\n         <sw-card :title="$tc(\'buckaroo-payment.paymentDetail.transactionsTitle\')">\n            <sw-data-grid :dataSource="relatedResources"\n                :columns="relatedResourceColumns"\n                :showActions="false"\n                :showSelection="false">\n\n                    <template #column-transaction_method="{ item }">\n                        <img :src="\'/bundles/buckaroopayment/storefront/buckaroo/logo/\'+item.transaction_method + \'.png\'" class="transaction-method-logo" width=20  :title="item.transaction_method">\n                            {{ item.transaction_method }}\n                    </template>\n\n            </sw-data-grid>\n         </sw-card>\n        <sw-loader v-if="isLoading">\n        </sw-loader>\n    </div>\n{% endblock %}'}},[["pLZ4","runtime","vendors-node"]]]);