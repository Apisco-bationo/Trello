<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'twp_db' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'ROOT' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '57OL:tJjV15|q2,63t,(zTcYBan/47V~Rd{V$+W_8+jBQ;w(=~Gs.c`2|p_(F%d(' );
define( 'SECURE_AUTH_KEY',  'E-IS:x6A1bWEhu2KffR@l-(ZbavE&Swg<u^aR[d/Vcv=moEo`m`lVD4pmr7Bij=g' );
define( 'LOGGED_IN_KEY',    'O/Qq58w4@<`7XuKundK:-o3aDnb@ p]$zlE*0 gvTQ@nyIw2]:~PbMr3IH6hq+&.' );
define( 'NONCE_KEY',        'pp;rH}Z CXm>2mOG{78o)e|ElCdn{h-/tx.OS$&Y(E80gSZshpB BLeT=YJ3|ee8' );
define( 'AUTH_SALT',        'IW0O&XD|.RZ-zQ,c!qlr0?z)qSlu1TXwsfr`lPk.j7upKY6/rNcy1D]2=*8^;}xh' );
define( 'SECURE_AUTH_SALT', 'FF+CqW7=G{~GFjb@ccE459BA:mM}%b&ya(4yg,D[F7Sx1;[w4Wa6,b;,{[(l<-,&' );
define( 'LOGGED_IN_SALT',   'v/iL<yM/az _O!*YmGL+O(V;a<B:xhJr1_]J8FV]2q6ayDj?Q}X+HbEz$H-3#g+4' );
define( 'NONCE_SALT',       '2(l{)>/m L&>hz=:u<H|j,fw<E}<lFaRQTOUr`.TpR{A?+!Moh8GJ_T|?:GF@)&3' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', true );

/* Add any custom values between this line and the "stop editing" line. */

// define('WP_HOME', 'http://localhost:8888');
// define('WP_SITEURL', 'http://localhost:8888');


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
