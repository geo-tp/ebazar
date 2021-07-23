

class Formatter:

    def to_tab_of_dict(self, queryset):

        tab = []
        for row in queryset:
            dico = {}
            for index, value in enumerate(row):
                dico[self.fields[index]] = value

            tab.append(dico)

        return tab



class BidDeserializer(Formatter):

    fields = ['id',
              'price',
              'obj',
              'user']

class ObjectDeserializer(Formatter):

    fields = ['id', 
              'title', 
              'description', 
              'actualPrice', 
              'creationDate', 
              'durationInDays', 
              "endingDate",
              'isActive', 
              'isSelled', 
              'reservePrice', 
              'shippingPrice', 
              "returnPolicy", 
              "mainImage", 
              "category",
              "views",
              'state', 
              'subcategory', 
              'user']



class UserDeserializer(Formatter):

    fields = [
        "id",
        "username",
        "email",
        "first_name",
        "last_name",
        "date_of_birth",
        "street_number",
        "street_type",
        "street_name",
        "city_number",
        "city"]




if __name__ == "__main__":
    query = [(18, '11111111111111111', 'EZ', 33.0, '2021-06-30 23:27:46.141196', 2, '2021-07-02 23:27:46.058863', 1, 0, 3.0, 11.0, 1, 'apple-iphone-12-pro-max_001_l8JI1ae.jpg', 2, 3, 6, 1), (19, 'efzefzef', 'zefzefzefze', 3.0, '2021-06-30 23:28:56.709453', 3, '2021-07-03 23:28:56.610130', 1, 0, 22.0, 12.0, 1, 'footkorner-nike-tshirt-nike-air-noir-blanc-aa2303-011_R3DrWyY.jpeg', 9, 3, 25, 1), (20, 'EEEEEE', 'FFFF', 11.0, '2021-06-30 23:30:32.639747', 3, '2021-07-03 23:30:32.592848', 1, 0, 12.0, 33.0, 1, 'guitare_S1MQtl3.jpg', 3, 3, 9, 1), (21, 'AAAAAA', 'AAAAAAAA', 33.0, '2021-06-30 23:32:51.238462', 3, '2021-07-03 23:32:51.190517', 1, 0, 22.0, 22.0, 1, 'sous-vetement-thermique-12-zip-en-laine-merinos_URZgOID.jpg', 4, 3, 12, 1)]
    print(ObjectDeserializer().to_tab_of_dict(query))