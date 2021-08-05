


import sqlite3
import src.sqlrequest as deserializers
import os
import src.deserializers as deserializers
import src.sqlrequest as sqlrequest


class Sqlite:

    def change_cwd_to_load_db(self):

        parent_folder = os.path.dirname(os.getcwd())
        os.chdir(parent_folder)

        return 'ebay/db.sqlite3'

    def connectToSQLite(self):

        try:
            self.connexion = sqlite3.connect(self.change_cwd_to_load_db())
            self.cursor = self.connexion.cursor()
        except:
            raise Exception("Le chemin d'accès à la DB est invalide")

    def loadAllObjects(self):

        try:
            self.objects_watchlist = self.cursor.execute(sqlrequest.get_all_objects).fetchall()
        except:
            self.objects_watchlist = []

    def loadActiveObjects(self):

        try:
            self.objects_watchlist = self.cursor.execute(sqlrequest.get_active_objects()).fetchall()
        except:
            self.objects_watchlist = []

    def deserializeObjects(self):
        self.objects_watchlist = deserializers.ObjectDeserializer().to_tab_of_dict(self.objects_watchlist)

    def loadBidsOfObject(self, object_id):

        try:
            bids = self.cursor.execute(sqlrequest.get_bids_of_object(object_id))
        except:
            bids = []

        return self.deserializeBids(bids)

    def createPurchasedObject(self, obj, user):
        self.cursor.execute(sqlrequest.create_purchased_object(obj["id"], user))
        self.cursor.execute(sqlrequest.set_object_to_selled(obj["id"]))
        self.connexion.commit()
    
    def deserializeBids(self, bids):
        return deserializers.BidDeserializer().to_tab_of_dict(bids)

    def setObjectToInactive(self, object_id):
        try:
            self.cursor.execute(sqlrequest.set_object_to_inactive(object_id))
            self.connexion.commit()
        except:
            self.error_count +=1

    def setObjectDates(self, object_id, creation, ending):
        self.cursor.execute(sqlrequest.set_new_creation_and_ending_date(object_id, creation, ending))
        self.connexion.commit()