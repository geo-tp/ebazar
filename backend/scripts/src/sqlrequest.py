import datetime

get_all_objects = "SELECT * FROM ebay_objects_object"


def get_active_objects():

    now = datetime.datetime.now()

    limit_date = now+datetime.timedelta(days=2)

    return  """
            SELECT * FROM ebay_api_object
            WHERE isActive=1 AND endingDate < '{}'
            """.format(limit_date)



def get_bids_of_object(object_id):
    
    return("""
        SELECT * from ebay_account_bid
        WHERE id={}
        """.format(object_id)
    )

def get_user(user_id):

    return("""
        SELECT * users_customuser
        WHERE id={}
    """.format(user_id)
    )

def set_object_to_inactive(object_id):

    return( 
        """
        UPDATE ebay_ojbjects_object
        SET isActive=0
        WHERE id={}
        """.format(object_id)
    )

def set_new_creation_and_ending_date(object_id, creation, ending):
    return( 
        """
        UPDATE ebay_objects_object
        SET creationDate='{}', endingDate='{}'
        WHERE id={}
        """.format(creation, ending, object_id)
    )

def set_object_to_selled(object_id):

    return( 
        """
        UPDATE ebay_objects_object
        SET isSelled=1
        WHERE id={}
        """.format(object_id)
    )


def create_purchased_object(obj, user):

    return(
        """
        INSERT INTO ebay_objects_purchasedobject (obj_id, user_id, isPaid)
        VALUES ({}, {}, 0)
        """.format(obj, user)
    )

