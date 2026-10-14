<?php
/** Theme Builder aware site header. */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php
if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'header' ) ) :
	$logo_url = 'https://www.createlocalmarketing.com/wp-content/uploads/2024/07/digital-marketing-agency-create-local-logo.png';
	?>
	<header class="clm-site-header" id="masthead">
		<div class="clm-site-header__inner">
			<a class="clm-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
				<?php if ( has_custom_logo() ) { the_custom_logo(); } else { ?>
					<img src="<?php echo esc_url( $logo_url ); ?>" alt="Create Local Marketing" width="817" height="169" fetchpriority="high">
				<?php } ?>
			</a>
			<nav class="clm-site-nav" aria-label="<?php esc_attr_e( 'Primary navigation', 'create-local-marketing' ); ?>">
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'fallback_cb' => 'wp_page_menu', 'depth' => 2 ) ); ?>
			</nav>
			<div class="clm-header-tools"></div>
		</div>
	</header>
<?php endif; ?>
