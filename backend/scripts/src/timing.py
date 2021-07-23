import datetime

class Time:

    def convert_str_to_date(self, date):

        date = date.split('.')[0]
        return datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S")

    def calculate_time_left(self, date):

        date = self.convert_str_to_date(date)
        now = datetime.datetime.now()

        delta = date - now

        return delta.total_seconds()

    def get_now(self):
        return datetime.datetime.now()

    def add_to_date(self, date, **kwargs):

        if type(date) == type("str"):
            date = self.convert_str_to_date(date)

        delta = datetime.timedelta(**kwargs)

        return date+delta


if __name__ == "__main__":

    print(Time().calculate_time_left('2021-06-30 23:27:46.141196'))