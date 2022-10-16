<?php

/**
 * @file
 * Provide hooks and overrides relevant to the features of Wilson.
 */

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_ENTITY_TYPE_view_alter().
 */
function wilson_paragraph_view_alter(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display) {
  // Override the map zoom display settings with the value of field_map_zoom.
  if ($entity->hasField('field_map_address') && $entity->hasField('field_map_zoom')) {
    $zoom = $entity->get('field_map_zoom')->getString();
    $build['field_map_address'][0]['#zoom'] = $zoom;
  }

  // Create a hashed value of the Anchor point label.
  if ($entity->getType() == 'anchor_point') {
    $build['anchor_point_id']['#markup'] = _wilson_anchor_point_id($entity->get('field_anchor_point_label')->getString());
  }

  // Add an array of Anchor points for Hero jump nav.
  if ($entity->getType() == 'hero') {
    $parentEntity = $entity->getParentEntity();
    $build['jump_nav_anchor_points'] = [];

    if ($parentEntity->hasField('field_sections')) {
      $pageParagraphs = $parentEntity->field_sections->referencedEntities();
      foreach ($pageParagraphs as $paragraph) {
        if ($paragraph->getType() == 'anchor_point') {
          $build['jump_nav_anchor_points'][] = [
            'label' => ['#markup' => $paragraph->get('field_anchor_point_label')->getString()],
            'id' => ['#markup' => _wilson_anchor_point_id($paragraph->get('field_anchor_point_label')->getString())],
          ];
        }
      }
    }
  }
}

/**
 * Implements hook_field_widget_paragraphs_form_alter().
 */
function wilson_field_widget_paragraphs_form_alter(&$element, &$form_state, $context) {
  if ($element['#paragraph_type'] == 'anchor_point'){
    // Prepare the label field to display the hash alongside.
    $element['subform']['field_anchor_point_label']['widget'][0]['value']['#attributes']['size'] = '30';
    $element['subform']['field_anchor_point_label']['widget'][0]['value']['#attributes']['class'][] = 'anchor-point-hash';

    // Attach the JavaScript hash generator.
    $element['#attached']['library'][] = 'wilson/anchor-point-hash';
  }
}

/**
 * Create a URL-safe ID from the anchor label text.
 *
 * @param $anchorLabel
 * @return string
 */
function _wilson_anchor_point_id($anchorLabel) {
  return preg_replace('/[^a-z0-9-]/i', '-', strtolower($anchorLabel));
}

/**
 * Implements hook_field_widget_form_alter().
 */
function wilson_field_widget_form_alter(&$element, FormStateInterface $form_state, $context) {
  // User interface improvements to the contrib Material Icons field.
  $field_definition = $context['items']->getFieldDefinition();
  if ($field_definition->getType() == 'material_icons') {
    // Add a JavaScript behaviour which displays a preview of the selected icon.
    $element['icon']['#attributes']['size'] = '30';
    $element['icon']['#attributes']['class'][] = 'material-icons-widget';
    $element['#attached']['library'][] = 'wilson/material-icons-widget';
  }
}
