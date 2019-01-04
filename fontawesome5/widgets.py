from __future__ import absolute_import
import json

from django import VERSION as django_version
from django import forms
from django.conf import settings
from django.utils.encoding import force_text
from django.utils.safestring import mark_safe
from django.utils.html import format_html

from .utils import get_icon_choices

CHOICES = get_icon_choices()

class IconWidget(forms.Select):
    template_name = 'fontawesome/select.html'

    def __init__(self, attrs=None):
        super(IconWidget, self).__init__(attrs, choices=CHOICES)

    class Media:

        js = (
            'fontawesome/js/django-fontawesome.js',
        )

        css = {
            'all': (
                getattr(settings, 'FONTAWESOME_5_CSS_URL', 'fontawesome/css/all.min.css'),
                'fontawesome/css/django-fontawesome.css'
            )
        }
