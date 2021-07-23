from src.sqlite import Sqlite
from src.timing import Time


class Renew:
    """
    Permet de remettre en vente et de changer la date de debut/fin de tous les objets
    """

    def __init__(self):

        self.db_connection = Sqlite()
        self.time_utils = Time()

        self.db_connection.connectToSQLite()
        self.db_connection.loadAllObjects()
        self.db_connection.deserializeObjects()


    def restart_all(self):
        """
        Remet les objets en vente
        """
        print(self.db_connection.objects_watchlist)
        for obj in self.db_connection.objects_watchlist:

            now = self.time_utils.get_now()
            duration_in_days = int(obj["durationInDays"])
            
            ending = self.time_utils.add_to_date(now, days=duration_in_days)

            self.db_connection.setObjectDates(obj["id"], now, ending)





            
if __name__ == "__main__":

    r = Renew()
    r.restart_all()