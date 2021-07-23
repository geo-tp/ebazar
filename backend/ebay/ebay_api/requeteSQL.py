
def requete_recherche(recherche):

    return """

    SELECT *
    FROM ebay_api_object
	WHERE instr(title, "{}") > 0 OR instr(description, "{}")
    """.format(recherche, recherche)

