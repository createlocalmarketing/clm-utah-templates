<?php
/** Theme Builder aware site footer. */
if ( ! defined( 'ABSPATH' ) ) { exit; }
if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'footer' ) ) :
?>
	<footer class="clm-site-footer" id="colophon">
		<div class="clm-site-footer__inner">
			<a class="clm-brand__text" href="<?php echo esc_url( home_url( '/' ) ); ?>">Create Local Marketing</a>
			<p class="clm-muted">Strategy, creative, technology, and growth for businesses building their next chapter.</p>
			<div class="clm-site-footer__bottom">&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> Create Local Marketing. All rights reserved.</div>
		</div>
	</footer>
<?php endif; ?>
<?php wp_footer(); ?>
</body>
</html>
