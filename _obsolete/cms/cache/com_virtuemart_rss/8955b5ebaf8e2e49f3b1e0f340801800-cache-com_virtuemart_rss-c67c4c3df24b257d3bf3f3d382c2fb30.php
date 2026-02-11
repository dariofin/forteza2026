<?php die("Access Denied"); ?>#x#a:2:{s:6:"result";a:5:{i:0;O:8:"stdClass":3:{s:4:"link";s:106:"https://virtuemart.net/news/enhanced-compatibility-for-coupons-and-some-templates-opc-and-some-minor-fixes";s:5:"title";s:79:"Enhanced compatibility for coupons and some templates, Opc and some minor fixes";s:11:"description";s:3158:"<p>Just some minor fixes. All this fixes are already ported to VirtueMart 5.But check your coupons, some shops had problems with the last token integration, this new version should fix this. All other enhancements are safe.</p>
<h4>Interesting for shopadmins</h4>
<ul>
<li>Fixed couponhandling. Moved the token check before the function setCouponCode</li>
<li>added jpeg to multiple image uploads</li>
<li>product model, small fix for correct search of products in a subcategory of a selected category</li>
<li>added a hidden config for product slug handler. Can be set to "changed", which changes the slug if productname got changed, or "always"</li>
<li>Enhanced 404 handling, parts of the router used a fallback, which was wrong</li>
<li>Userfields in cart add captcha only, if it is allowed to register without product in cart</li>
<li>PayPal checkout, order approved should not sent an email anylonger</li>
<li>PayPal checkout configuration, removed invalid order stati in order dropdowns</li>
</ul>
<h4>Interesting for developers</h4>
<ul>
<li>plgVmInitialise was just for the FE, added trigger plgVmInitialiseBE for the BE</li>
<li>calculatorH enhanced the old rules cache. New calculator is now created without using delivery country or state. The new cache handles per vendorid, delivery country and states. All in a new static function loadAllRulesCached</li>
<li>manufacturer model added triggers plgVmBeforeStoreManufacturer and plgVmAfterStoreManufacturer</li>
<li>user cache works now for id 0 too</li>
<li>vmtable self::$loadedX =&gt; $this-&gt;_loadedX</li>
<li>Field vmorderstate added option to exclude stati</li>
<li>added to vmTables the possibility to add a where (and not using the primary key)</li>
</ul>
<p style="text-align: center;"><a class="btn btn-primary" href="https://extensions.virtuemart.net/support-updates/virtuemart-membership">DOWNLOAD VirtueMart 4.6.6<br />NOW (needs Membership)</a></p>
<h4>Just Fixes</h4>
<ul>
<li>Category model, fixed missing parents in case loaded by cache, but loaded by router without parents</li>
<li>Little fiix by stAn of RuposTel for authorizenet plugin.</li>
<li>Small fix in custom view to prevent error if there is no custom</li>
<li>Some minors, removed setRouterVars after loadConfig in the module</li>
<li>little fix for the getChildCategoryListObject to prevent str_replace with null</li>
<li>catched 500: count(): Argument #1 ($value) must be of type Countable in reviews, if no review given</li>
<li>cart helper, function add fixed the quantity array if it does not fit the given product id array</li>
</ul>
<h4>Optimisations</h4>
<ul>
<li>changed currencydisplay to reuse already loaded vendor currency</li>
<li>currency model, found uncached query and replaced against default getVendor function (likely cached or reused)</li>
<li>shoppergroup model, the function getShoppergroup and getDefault share their result in the cache now, which spares 2 sql calls</li>
<li>cart helper, $this-&gt;setCartIntoSession, removed the second param true, because actually we need it only one time at begin to prevent that a checkout is fired more than one time (spares 4-6 sql calles)</li>
</ul>";}i:1;O:8:"stdClass":3:{s:4:"link";s:71:"https://virtuemart.net/news/new-opc-needed-some-fixes-auto-token-system";s:5:"title";s:44:"New OPC needed some fixes, auto token system";s:11:"description";s:886:"<p>We underestimated the problems with the missing tokens, despite the given manual <a href="https://docs.virtuemart.net/tutorials/templating-layouts/fix-missing-token-in-checkout-virtuemart-4-6-x" target="_blank" rel="noopener">Fix Missing Token in Checkout VirtueMart 4.6.x</a>.</p>
<p>So first I added a Plugin, which sets the missing token per trigger as default html. But most people did not see it, so the team asked to add a fix directly in the core. Later I let a community user test the new option. The user asked an AI where to find that option and the AI was surprisingly perfectly updated by the committs of the svn, but then failed with the right version numbers. Freaky at meta level correct, but wrong on the facts. Just as an interesting sidenote. And it used the expression. "Auto token system". Sounds great. So lets use "the new VirtueMart auto token system" ;-)</p>
";}i:2;O:8:"stdClass":3:{s:4:"link";s:81:"https://virtuemart.net/news/we-put-on-the-helmet-important-security-release-4-6-0";s:5:"title";s:54:"We put on the helmet! Important Security release 4.6.0";s:11:"description";s:1389:"<h5>Another important security and bugfix release 4.6.0</h5>
<p>An XSS found again by Adam Wallwork. This time I did general update of our filters, many functions got enhanced. Some filters are now always active, we do not leave it to the developers. This version is NOT working on Joomla 6, we will release a new VirtueMart 5 too match all the changes.</p>
<p> </p>
<figure style="text-align: center;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://virtuemart.net/images/stories/news/MaxMilbersAtKonigsstein_Copyright_Max_Milbers.png" alt="Max Milbers wearing a helmet" width="800" height="355" loading="lazy" data-path="local-images:/stories/news/MaxMilbersAtKonigsstein_Copyright_Max_Milbers.png" />
<figcaption>Max Milbers put on the helmet at Königstein Fortress</figcaption>
</figure>
<h5>For Updaters</h5>
<p>If you get the error in the cart "Invalid token". Please read this tutorial <a title="Fix Missing Token in Checkout VirtueMart 4.6.x" href="https://docs.virtuemart.net/tutorials/templating-layouts/fix-missing-token-in-checkout-virtuemart-4-6-x" target="_blank" rel="noopener">https://docs.virtuemart.net/tutorials/templating-layouts/fix-missing-token-in-checkout-virtuemart-4-6-x</a></p>
<h5>What else happened?</h5>
<p>We heavily work on a namespaced VirtueMart version, which runs without legacy plugin on Joomla 3 up to Joomla 6.</p>
";}i:3;O:8:"stdClass":3:{s:4:"link";s:62:"https://virtuemart.net/news/security-and-bugfix-release-4-4-10";s:5:"title";s:44:"Important Security and Bugfix release 4.4.10";s:11:"description";s:278:"<p>Whats going on here? 3rd security release within 6 months? Yes that is unusual, but better the leaks are found and closed than wrong safety feeling. In this special case we provide also the fix for old installations. It should work for any installation higher than vm3.6</p>
";}i:4;O:8:"stdClass":3:{s:4:"link";s:61:"https://virtuemart.net/news/security-and-bugfix-release-4-4-8";s:5:"title";s:50:"Security and Bugfix release 4.4.8 - Discord Server";s:11:"description";s:1257:"<p>The security issue requires the permission to edit categories, so it is even likely that no shop is affected. Only multivendor shops that allow category editing may be affected. This issue was found by Adam Wallwork.</p>
<p>A small feature has been added for the checkboxes of “tos” and similar. It is now possible to use an article id or alias in the "default" field to load a joomla article if custom userfield and layout "tos" is selected. It is also possible to set the text to the "description" field only. Very handy for additional contract terms.</p>
<p>We have replaced our old TcPdf library with the official updated version 6.8.2 of TcPdf. The versioning was taken from the library. So it looks like a high jump, but the library has no new features, but is better secured and adapted for PHP8.</p>
<p>We have opened a new discord server which is in general free for any community member. The forum shows the invite link, if you are at least in the "Jr. Member" group, which is the first after "Beginner". You are welcome to join us there.</p>
<p style="text-align: center;"><a class="btn btn-primary" href="https://extensions.virtuemart.net/support-updates/virtuemart-membership">DOWNLOAD VirtueMart 4.4.8<br />NOW needs membership</a></p>
";}}s:6:"output";s:0:"";}