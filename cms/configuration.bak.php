<?php
/**
 * ================================================================================
 * Backup copy of Joomla's configuration.php
 * ================================================================================
 *
 * Below you can find the contents of the configuration.php file which was read by
 * the Akeeba Backup Restoration Script when it initialised.
 *
 * This is NOT necessarily the contents of your backed up site's configuration.php
 * file. Every time you run the Restoration Script past the Site Setup page, the
 * configuration.php file gets modified. If you want to reset and start over after
 * going past the Site Setup page you'll need to extract your backup archive again. 
 */?><?php
/**
 * Joomla Global Configuration
 *
 * This file has been modified by the Akeeba Backup Restoration Script, when restoring or transferring your site.
 * 
 * This comment is removed whe you save the Global Configuration from Joomla's interface and/or when a third party
 * extension modifies your site's Global Configuration.
 * 
 * You can find the contents of the original file the Restoration Script read from your site in the 
 * configuration.bak.php file, located in the same directory as this file here. 
 */
class JConfig
{
	public $MetaAuthor = false;
	public $MetaDesc = '';
	public $MetaRights = '';
	public $MetaVersion = false;
	public $access = 1;
	public $asset_id = '1';
	public $behind_loadbalancer = false;
	public $cache_handler = 'file';
	public $cache_platformprefix = false;
	public $cachetime = 15;
	public $caching = 1;
	public $captcha = '0';
	public $cookie_domain = '';
	public $cookie_path = '';
	public $cors = false;
	public $cors_allow_headers = 'Content-Type,X-Joomla-Token';
	public $cors_allow_methods = '';
	public $cors_allow_origin = '*';
	public $db = 'dariofz_fz2026';
	public $dbencryption = false;
	public $dbprefix = 'fz26_';
	public $dbsslca = '';
	public $dbsslcert = '';
	public $dbsslcipher = '';
	public $dbsslkey = '';
	public $dbsslverifyservercert = false;
	public $dbtype = 'mysqli';
	public $debug = false;
	public $debug_lang = false;
	public $debug_lang_const = true;
	public $display_offline_message = 1;
	public $editor = 'tinymce';
	public $error_reporting = 'default';
	public $feed_email = 'none';
	public $feed_limit = 10;
	public $force_ssl = '2';
	public $fromname = 'FORTEZA';
	public $frontediting = 0;
	public $gzip = false;
	public $helpurl = 'https://help.joomla.org/proxy?keyref=Help{major}{minor}:{keyref}&lang={langcode}';
	public $host = 'localhost';
	public $lifetime = 15;
	public $list_limit = 20;
	public $live_site = '';
	public $log_categories = '';
	public $log_category_mode = 0;
	public $log_deprecated = 0;
	public $log_everything = 0;
	public $log_path = '/home/dariofz/public_html/cms/administrator/logs';
	public $log_priorities = array (
'0' => 'all'
);
	public $mailer = 'mail';
	public $mailfrom = 'joomla.developer.1974@gmail.com';
	public $mailonline = false;
	public $massmailoff = false;
	public $memcached_compress = false;
	public $memcached_persist = true;
	public $memcached_server_host = 'localhost';
	public $memcached_server_port = 11211;
	public $offline = false;
	public $offline_image = '';
	public $offline_message = 'Este sitio no está disponible temporalmente por tareas de mantenimiento.<br />Por favor, inténtelo en otro momento.';
	public $offset = 'America/Montevideo';
	public $password = 'feNdiFills90';
	public $proxy_enable = false;
	public $proxy_host = '';
	public $proxy_pass = '';
	public $proxy_port = '';
	public $proxy_user = '';
	public $redis_persist = true;
	public $redis_server_auth = '';
	public $redis_server_db = 0;
	public $redis_server_host = 'localhost';
	public $redis_server_port = 6379;
	public $replyto = '';
	public $replytoname = '';
	public $robots = '';
	public $secret = 'K78bh59VA9SloZfzGHjfK4X5Hqiwz5bQ';
	public $sef = true;
	public $sef_rewrite = true;
	public $sef_suffix = false;
	public $sendmail = '/usr/sbin/sendmail';
	public $session_filesystem_path = '';
	public $session_handler = 'database';
	public $session_memcached_server_host = 'localhost';
	public $session_memcached_server_port = 11211;
	public $session_metadata = true;
	public $session_metadata_for_guest = true;
	public $session_redis_persist = 1;
	public $session_redis_server_auth = '';
	public $session_redis_server_db = 0;
	public $session_redis_server_host = 'localhost';
	public $session_redis_server_port = 6379;
	public $shared_session = false;
	public $sitename = 'FORTEZA';
	public $sitename_pagetitles = 0;
	public $smtpauth = false;
	public $smtphost = 'localhost';
	public $smtppass = '';
	public $smtpport = 25;
	public $smtpsecure = 'none';
	public $smtpuser = '';
	public $tmp_path = '/tmp';
	public $unicodeslugs = false;
	public $user = 'dariofz_dariofin';
}
