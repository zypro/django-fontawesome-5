from __future__ import absolute_import

from django import forms
from django.conf import settings

from .app_settings import get_icon_class, get_prefix
from .widgets import IconWidget


Icon = get_icon_class()
prefix = get_prefix()


class IconFormField(forms.Field):

    def __init__(self, *args, **kwargs):
        self.widget = IconWidget

        if 'initial' in kwargs:
           kwargs['initial'] = Icon(kwargs['initial'])

        super(IconFormField, self).__init__(**kwargs)

    def widget_attrs(self, widget):
        classes = widget.attrs.get('class', '').split()
        classes.append('d-fa-select')

        fontawesome_prefix = prefix

        return {
            'class': ' '.join(classes),
            'data-fontawesome-prefix':fontawesome_prefix
        }
