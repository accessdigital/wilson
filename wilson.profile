<?php

/**
 * @file
 * Provide hooks and overrides relevant to the features of Wilson.
 */

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;

/**
 * Implements hook_entity_view_alter().
 */
function wilson_entity_view_alter(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display) {
  // Override the map zoom display settings with the value of field_map_zoom.
  if ($entity->hasField('field_map_address') && $entity->hasField('field_map_zoom')) {
    $zoom = $entity->get('field_map_zoom')->getString();
    $build['field_map_address'][0]['#zoom'] = $zoom;
  }
}
