# django-fontawesome-5

A utility for using icons in models, forms, and templates.

![Clip of dropdown](https://github.com/BenjjinF/django-fontawesome/blob/master/docs/images/django-fontawesome-5.gif)

## Installation / Usage

    pipenv install -e git+https://github.com/BenjjinF/django-fontawesome-5

Add 'fontawesome' to your installed `INSTALLED_APPS`:

    INSTALLED_APPS = (
        ...
        'fontawesome',
    )


Import and use `IconField`:
    
    from fontawesome.fields import IconField

    class Category(models.Model):
        ...
        icon = IconField()


Include Static Files

    {% load fontawesome5 %}

    <head>
      {% fontawesome5_static %} 
      ...
    </head>

## Rendering

You can do a simple render  in your template like this:
    
    {% for category in categories.all %}
        {% if category.icon %}
            {{ category.icon.as_html }}
        {% endif %}
    {% endfor %}

Or you can use the `{% fa5_icon %}` template tag.

    {% fa5_icon 'fas' 'check' %}

Required arguments are `style_prefix` and `icon`

### Key word arguments:
  - color (CSS Color Names)
  - title
  - border (boolean)
  - fixed_width (boolean)
  - flip (horizontal, vertical)
  - li (boolean)
  - pull (left, right)
  - pulse (boolean)
  - rotate (degrees)
  - size 
     - fa-xs
     - fa-sm
     - fa-lg
     - fa-2x
     - fa-3x
     - fa-5x
     - fa-7x
     - fa-10x
  - spin (boolean)
  
## Settings

You can configure django-fontawesome to use another release/source/cdn by specifying::

    FONTAWESOME_CSS_URL = '//cdn.example.com/fontawesome-min.css'  # absolute url
    FONTAWESOME_CSS_URL = 'myapp/css/fontawesome.min.css'  # relative url
    FONTAWESOME_ICONS_JSON = /path/to/icons.json
    FONTAWESOME_PREFIX = 'bg'  # default is 'fa'

## Credit

Credit to https://github.com/redouane for the original ~

## Changes
 - Updated for use with Font Awesome 5
 - Removed PyYAML, Select2, and jQuery as dependencies
 - Static files tag includes static dependencies for use outside admin
