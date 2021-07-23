"""ebay URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from ebay_api import views
from users import views as users_views
from django.conf import settings
from django.conf.urls.static import static

from allauth.account.views import confirm_email
from django.conf.urls import url
from django.contrib import admin

import debug_toolbar

router = routers.DefaultRouter()
router.register(r'state', views.StateOfObjectViewSet)
router.register(r"duration", views.DurationViewSet)
router.register(r'category', views.CategoryViewSet)
router.register(r"selection", views.SelectionViewSet)
router.register(r'subcategory', views.SubCategoryViewSet)
router.register(r'object', views.ObjectViewSet)
router.register(r'image', views.ImageViewSet)
router.register(r'bid', views.BidViewSet)
router.register(r'message', views.MessageViewSet)
router.register(r'question', views.QuestionViewSet)
router.register(r'answer', views.AnswerViewSet)
router.register(r"user", users_views.UserViewSet)
router.register(r"followed-object", views.FollowedObjectViewSet)
router.register(r"followed-object-by-user", views.FollowedObjectByUserViewSet)
router.register(r"bidded-object-by-user", views.BiddedObjectByUserViewSet)
router.register(r'purchased-object', views.PurchasedObjectViewsSet)
# router.register(r'withdrawal', views.WithdrawalViewSet)
router.register(r'operation', views.OperationViewSet)
router.register(r"offer-banner", views.OfferBannerViewSet)


# router.register(r'best-bid-of-object', views.BestBidOfObjectViewSet)
router.register(r"messaging", views.MessagingViewSet)
router.register(r"detailled-user", views.DetailledUserViewSet)
router.register(r'detailled-object', views.DetailledObjectViewSet)
router.register(r"account-user", views.AccountUserViewSet)
router.register(r'balance-user', views.BalanceViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('__debug__/', include(debug_toolbar.urls)),
    path('admin/', admin.site.urls),
    # path("detail-objects/", views.full_details_list),
    # path("detail-objects/<int:object_id>", views.full_details_object),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),
    path('accounts-rest/registration/account-confirm-email/<key>', confirm_email, name='account_confirm_email'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
