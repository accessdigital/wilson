<?php

/**
 * @file
 * Provide hooks and overrides relevant to the features of Wilson.
 */

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;

/**
 * Implements hook_ENTITY_TYPE_view_alter().
 *
 * @TODO Move this glue code out of the profile. Maybe to the theme?
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
 * Create a URL-safe ID from the anchor label text.
 *
 * @param $anchorLabel
 * @return string
 */
function _wilson_anchor_point_id($anchorLabel) {
  return preg_replace('/[^a-z0-9-]/i', '-', strtolower($anchorLabel));
}
