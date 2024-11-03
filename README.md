# 2. EXPRESS JA PUG

- Luodaan palvelin, joka käsittelee HTTP pyyntöjä
- Eri metodeja joita käytetty:

  - GET = hakee koko mock datan sisällön
  - GET ID = hakee mock datan sisällöstä itemin / id numero
  - POST = lisää uuden median / käyttäjän
  - DELETE = poistaa median / käyttäjän tietyllä ID:llä

- PUGilla renderöidään index

## Mitä tehty ja ongelmat

- Lisätty USERS.js
- Lisätty DELETE metodi media.js ja user.js
- PUT ei toimi

## SCREENSHOSTS

### GET

Get media:
![get_all.png](ss/ss2/get_all.png)
![get_id.png](ss/ss2/get_id.png)

Get user:
![get_users.png](ss/ss2/get_users.png)
![get_user.png](ss/ss2/get_user.png)

### POST

Post media:
![post_media.png](ss/ss2/post_media.png)

Post user:
![new_user1.png](ss/ss2/new_user1.png)
![new_user2.png](ss/ss2/new_user2.png)

### DELETE

Delete media:
![del_media.png](ss/ss2/del_media.png)

Delete user
![del_user.png](ss/ss2/del_user.png)
![after_del.png](ss/ss2/after_del.png)

## PUG

Pugilla renderöinti:
![pug_render.png](ss/ss2/pug_render.png)
