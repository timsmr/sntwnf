def if_appropriate_recievers(users: list, recievers: list):
    for x in range(len(users)):
        if users[x] == recievers[x]:
            return False
    return True


def define_recievers(guests, recievers: list):
    for i in range(len(guests)):
        guests[i].giving_to = recievers[i]
    return guests
