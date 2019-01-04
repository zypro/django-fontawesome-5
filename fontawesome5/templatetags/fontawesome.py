from __future__ import unicode_literals

from django import template
from django.conf import settings
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.utils.html import format_html, mark_safe

from .. import Icon

register = template.Library()


@register.simple_tag
def fa5_icon(*args, **kwargs):
    return Icon(*args, **kwargs).as_html()


@register.simple_tag
def fontawesome5_static():
    fontawesome_css = format_html(
        '<link href="{0}" rel="stylesheet" media="all">\n',
        getattr(settings, 'FONTAWESOME_CSS_URL', static('fontawesome/css/all.min.css')))
    dfa_css = format_html(
        '<link href="{0}" rel="stylesheet" media="all">\n', 
        static('fontawesome/css/django-fontawesome.css'))
    dfa_js = format_html(
            '<script type="text/javascript" src="{}"></script>\n',
            static('fontawesome/js/django-fontawesome.js'))
    return fontawesome_css + dfa_css + dfa_js
