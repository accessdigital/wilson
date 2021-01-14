<?php

use Drupal\Component\Utility\Html;
use Drupal\image\Entity\ImageStyle;
use Drupal\Core\Render\Markup;

/**
 * Prepares variables for the paragraph.html.twig template.
 */
function wilson_preprocess_paragraph(&$variables) {
  $paragraph = $variables['paragraph'];
  $variables['attributes']['id'] = 'section-' . $variables['paragraph']->id();

  // Inject CSS classes to the paragraph wrapper.
  if ($paragraph->hasField('field_css_classes') && !$paragraph->field_css_classes->isEmpty()) {
    $string = $paragraph->get('field_css_classes')->getString();
    $classes = preg_split('/[\ \n\,]+/', $string);
    $variables['attributes']['class'] = array_merge($variables['attributes']['class'] ?? [], $classes);
  }

  // Inject ID to the paragraph wrapper.
  if ($paragraph->hasField('field_id_anchor') && !$paragraph->field_id_anchor->isEmpty()) {
    $string = $variables['paragraph']->get('field_id_anchor')->getString();
    $variables['attributes']['id'] = Html::getId($string);
  }

  // Inject background colour styles/classes.
  if ($paragraph->hasField('field_section_bg_colour') && !$paragraph->field_section_bg_colour->isEmpty()) {
    $colourTerm = $paragraph->field_section_bg_colour->entity;

    if ($colourTerm) {
      if (!$colourTerm->field_colour->isEmpty()) {
        $css = 'background-color: ' . $colourTerm->get('field_colour')->getString();
        $variables['background_colour_style'] = $css;
      }

      if (!$colourTerm->field_css_classes->isEmpty()) {
        $string = $colourTerm->get('field_css_classes')->getString();
        $variables['background_colour_classes'] = $string;
      }
    }
  }

  // Inject background image styles.
  if ($paragraph->hasField('field_section_bg') && !$paragraph->field_section_bg->isEmpty()) {

    // Get the image URL from the referenced media item.
    $imageUri = $paragraph->field_section_bg->entity->field_media_image->entity->uri->value;

    // Load the Wilson breakpoints to obtain the media query selectors.
    $breakpoints = \Drupal::service('breakpoint.manager')->getBreakpointsByGroup('wilson');

    $css = '';
    $selector = '#' . $variables['attributes']['id'];

    // Generate the initial fallback background styles.
    $fallbackStyleName = 'section_bg_fallback';
    if (ImageStyle::load($fallbackStyleName)) {
      $imageUrl = Markup::create(file_url_transform_relative(ImageStyle::load($fallbackStyleName)->buildUrl($imageUri)));
      $css .= "$selector { background-image: url('$imageUrl'); } ";
    }

    // Generate a background style for each breakpoint (where found).
    foreach ($breakpoints as $key => $breakpoint) {
      $breakpointId = str_replace( 'wilson.', '', $key);
      $imageStyleName = 'section_bg_' . $breakpointId;

      if (ImageStyle::load($imageStyleName)) {
        $imageUrl = Markup::create(file_url_transform_relative(ImageStyle::load($imageStyleName)->buildUrl($imageUri)));
        $css .= "@media " . $breakpoint->getMediaQuery() . " { $selector { background-image: url('$imageUrl'); }} ";
      }
    }

    // Inject the constructed CSS in to the page head.
    // TODO: This creates separate <style> tags for each paragraph. Combine?
    if ($css) {
      $variables['#attached']['html_head'][] = [
        [
          '#tag' => 'style',
          '#value' => $css,
        ], $variables['attributes']['id']
      ];

      $variables['has_bg_image'] = true;
    }
  }
}
