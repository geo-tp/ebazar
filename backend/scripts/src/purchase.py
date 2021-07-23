import src.deserializers
import src.sqlrequest

class Purchase:

    def object_is_selled(self, obj):

        bids = self.loadBidsOfObject(obj["id"])

        return 1 if len(bids) else 0

    def get_max_bid(self, bids):

        max_bid = bids[0]
        for bid in bids:

            if bid["price"] > max_bid["price"]:
                max_bid = bid

        return bid

    def reserve_price_is_reached(self, obj):
        return 1 if obj["reservePrice"] <= obj['actualPrice'] else 0

    def perform_purchase(self, obj):
        
        if not self.reserve_price_is_reached(obj):
            return 0

        if not self.object_is_selled(obj):
            return 0

        return self.create_purchase(obj)
         
    def create_purchase(self, obj):

        bids = self.loadBidsOfObject(obj["id"])

        max_bid = self.get_max_bid(bids)

        user = max_bid["user"]

        self.createPurchasedObject(obj, user)

        return 1



