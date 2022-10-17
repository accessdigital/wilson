# Helpful template hints

## Component template includes

To enforce consistency in template files, you can declare common components as Twig files in the `component` directory and include these in to your theme templates while passing specific variable values.

Example syntax displaying different ways of passing field values to variables of the component:

```
{% include '@wilson_theme_starterkit/templates/component/my-component.html.twig' with {
  image: content.field_image|field_value
  headline: content.field_headline|render ? paragraph.field_headline.0.value|check_markup('full_html') : '',
  caption: content.field_caption|field_value,
  link_url: content.field_primary_cta.0['#url'],
  link_text: content.field_primary_cta.0['#title'],
} %}
```

## Printing field values

### Print just the field value

To print the value of a field with no label or wrapping markup, you can use the `|field_value` filter.

```
{{ content.field_headline|field_value }}
```

### Print a link field

To manually construct an anchor tag from a link field:

```
# Field level template:
<a href="{{ item.content['#url'] }}" class="some-class">{{ item.content['#title'] }}</a>

# Node / paragraph template:
<a href="{{ content.field_link.0['#url'] }}" class="some-class">{{ content.field_link.0['#title'] }}</a>
```

If you wish to automatically make external URLs open in a new window:

```
# Field level template:
<a href="{{ item.content['#url'] }}" class="some-class"{% if item.content['#url'].isExternal %} target="_blank"{% endif %}>{{ item.content['#title'] }}</a>

# Node / paragraph template:
<a href="{{ content.field_link.0['#url'] }}" class="some-class"{% if content.field_link.0['#url'].isExternal %} target="_blank"{% endif %}>{{ content.field_link.0['#title'] }}</a>
```

### Print a field value that may contain HTML

It will sometimes be useful to accept basic HTML in a plain text field (e.g. a headline). To print fields with rendered markup you must access the field data directly and pass it through the `|check_markup` filter.

You must include the machine name of a text format to check the markup against, e.g. `full_html`.

For nodes:

```
{{ node.label|check_markup('full_html') }}

{{ node.field_text_field.0.value|check_markup('full_html') }}
```

For paragraphs:

```
{{ paragraph.field_headline.0.value|check_markup('full_html') }}
```

On PHP 8.0+ you will receive a warning if you field value is empty when you run the `|check_markup('full_html')` filter. Guard against this by wrapping the print statement with a check to see if there's anything to render from the `content` array.

```
{% if content.field_headline|render %}
  {{ paragraph.field_headline.0.value|check_markup('full_html') }}
{% endif %}
```
