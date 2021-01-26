# Helpful hints for printing fields

## Print just the field value

To print the value of a field with no label or wrapping markup, you can use the `|field_value` filter.

```
{{ content.field_headline|field_value }}
```

## Print a link field

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

## Print a field value that may contain HTML

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
