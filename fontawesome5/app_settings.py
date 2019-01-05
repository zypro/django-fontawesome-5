import os

from django.apps import apps
from django.conf import settings
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.core.exceptions import ImproperlyConfigured

from . import Icon

def get_prefix():
    return getattr(settings, 'FONTAWESOME_5_PREFIX', 'fa')


def get_icon_class():
    """
    Return the Icon model that is active in this project.
    """
    return getattr(settings, 'FONTAWESOME_5_ICON_CLASS', Icon)


def get_fontawesome_5_css():
    return static(getattr(settings, 'FONTAWESOME_5_CSS', 'fontawesome/css/all.min.css'))


def get_css():
    css = [static('django-fontawesome.css')]
    fontawesome_5_css = get_fontawesome_5_css()
    if fontawesome_5_css:
        css.append(fontawesome_5_css)
    return css


def get_css_admin():
    css = get_css()
    css_admin = static(getattr(settings, 'FONTAWESOME_5_CSS_ADMIN', None))
    if css_admin:
        css.append(css_admin)
    return css


def get_fontawesome_5_icon_json_path():
    path = getattr(settings, 'FONTAWESOME_5_ICONS_JSON', 'icons.json')
    return os.path.join(os.path.dirname(__file__), path)
