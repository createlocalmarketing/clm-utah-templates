<?php
/** Real not-found content, without pretending a page exists. */
defined( 'ABSPATH' ) || exit;
?><section class="npg-default-article">
<h1><?php esc_html_e( 'Nothing published here yet', 'national-parks-guide' ); ?></h1>
<p><?php esc_html_e( 'Visit another destination or use the search.', 'national-parks-guide' ); ?></p>
<?php get_search_form(); ?>
</section>
