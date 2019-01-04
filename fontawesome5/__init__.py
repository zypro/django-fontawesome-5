from django.conf import settings
from django.utils.html import format_html

class Icon(object):

    def __init__(self, style_prefix, icon_id):
        self.style_prefix = style_prefix
        self.icon_id = icon_id

    def as_html(self):
        if not self.icon_id:
            return ''

        prefix = getattr(settings, 'FONTAWESOME_PREFIX', 'fa')
        return format_html('<i class="{0} {1}-{2}"></i>', self.style_prefix, prefix, self.icon_id)

    def __str__(self):
        return "['{}', '{}']".format(self.style_prefix, self.icon_id)

    def __unicode__(self):
        return str(self)