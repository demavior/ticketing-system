from django.utils.deprecation import MiddlewareMixin
from .models import Tenant
from users.models import TenantToken

class TenantMiddleware(MiddlewareMixin):
    def process_request(self, request):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            token_key = auth_header.split(' ')[1]
            try:
                token = TenantToken.objects.get(key=token_key)
                request.tenant = token.tenant
            except TenantToken.DoesNotExist:
                request.tenant = None
        else:
            domain = request.get_host().split(':')[0]
            try:
                request.tenant = Tenant.objects.get(domain=domain)
            except Tenant.DoesNotExist:
                request.tenant = None