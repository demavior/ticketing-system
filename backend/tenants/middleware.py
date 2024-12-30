from django.utils.deprecation import MiddlewareMixin
from .models import Tenant

class TenantMiddleware(MiddlewareMixin):
    def process_request(self, request):
        domain = request.get_host().split(':')[0]
        try:
            request.tenant = Tenant.objects.get(domain=domain)
        except Tenant.DoesNotExist:
            request.tenant = None