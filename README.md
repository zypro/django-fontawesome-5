# django-fontawesome-5

A utility for using icons in models, forms, and templates.

![Clip of dropdown](https://github.com/BenjjinF/django-fontawesome/blob/master/docs/images/django-fontawesome-5.gif)

## Installation / Usage

    pipenv install git+https://github.com/BenjjinF/django-fontawesome-5.git#egg=django-fontawesome-5

Add 'fontawesome' to your installed `INSTALLED_APPS`:

    INSTALLED_APPS = (
        ...
        'fontawesome5',
    )


Import and use `IconField`:
    
    from fontawesome5.fields import IconField

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
  - title
  - color (CSS Color Names)
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

    FONTAWESOME_5_CSS = # URL or False
        default: 'fontawesome/css/django-fontawesome.css'
    FONTAWESOME_5_CSS_ADMIN = # URL or path
        default:FONTAWESOME_5_CSS
    FONTAWESOME_5_ICONS_JSON = 'Custom'
        default: '/path/to/icons.json'
    FONTAWESOME_5_ICON_CLASS = CustomIconClass 
        default: Icon
    FONTAWESOME_5_PREFIX = 'custom_prefix'
        default: 'fa'

## Credit

Credit to https://github.com/redouane for the original ~

## Changes
 - Updated for use with Font Awesome 5
 - Removed PyYAML, Select2, and jQuery as dependencies
 - Static files tag includes static dependencies for use outside admin
 - Moved icon logic to Icon class
 - Allowed for custom Icon classes