import time
import src.sqlite as sqlite
import src.timing as timing
import src.purchase as purchase
import src.logger as logger

class Watcher(sqlite.Sqlite,
              timing.Time,
              purchase.Purchase):

    def __init__(self):

        self.connexion = None
        self.cursor = None

        self.logger = logger.Logger()

        self.objects_watchlist = []

        self.error_count = 0

        self.connectToSQLite()

    def load(self):
        self.loadActiveObjects()
        self.deserializeObjects()

    def start(self):

        self.load()

        if self.objects_watchlist:

            while self.objects_watchlist:
                obj = self.objects_watchlist[0]
                time_left = self.calculate_time_left(obj["endingDate"])
                print('Fin de la prochaine enchère : ', obj["endingDate"])

                if time_left > 0:
                    print("Attente pour la desactivation du prochain objet")
                    time.sleep(time_left)

                self.setObjectToInactive(obj["id"])
                is_purchased = self.perform_purchase(obj)
                self.logger.create_log(obj, is_purchased)

                print("Fin de l'enchere ID N°{}".format(obj["id"]))
                del self.objects_watchlist[0]
        
        else:
            print("Rien à traiter : Hibernation pour 1 journée")
            time.sleep(86400)


        self.start()


if __name__ == "__main__":
    w = Watcher()
    w.start()



