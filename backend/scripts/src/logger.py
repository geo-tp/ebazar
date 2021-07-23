import sys


class Logger:

    def __init__(self):

        self.path_to_save_logs = sys.path[0]+"/logs/logs.txt"
        self.file_exist_or_create()
    
    def file_exist_or_create(self):

        try:
            f = open(self.path_to_save_logs, 'r')
            f.close()

        except FileNotFoundError:
            f = open(self.path_to_save_logs, 'w+')
            f.close()
            
    def format_log(self, obj, is_purchased):

        return  """
                ENCHERE N°{} ; STATUT {} ; SELLER_ID {} ; DATE {}
                """.format(obj['id'], "SALED" if int(is_purchased) else "UNSALED" ,obj["user"], obj["endingDate"])

    def save_log_to_file(self, formatted_log):

        with open(self.path_to_save_logs, "a") as f:
            f.write(formatted_log)

    def create_log(self, obj, is_purchased):

        formatted_log = self.format_log(obj, is_purchased)
        self.save_log_to_file(formatted_log)
