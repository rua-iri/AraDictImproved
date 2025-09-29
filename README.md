# AraDictImproved

<div align="center">
  <div>
    A program to deconstruct an arabic word and return its possible defintions using an updated and hopefully improved version of <a href="https://github.com/gitGNU/gnu_aramorph">gnu_aramorph</a>.
    </div>
  <br/>
  <div>
<img src="https://github.com/user-attachments/assets/5086571a-8de0-4680-809a-5dbd700a40ac" alt=AraDictImproved logo" width="45%" />
    </div>
</div>

## Setup

```bash
git clone https://github.com/rua-iri/AraDictImproved.git

cp .example.env .env
```

The `.env` file should then be populated with the appropriate secrets to allow the database to create a user and allow other services to connect to it.

```bash
docker compose up --build

curl localhost:3030/word/health
```

## Caching

This Project includes a Redis container to cache the reads from the database and speed up the response time, since all database operations are reads.

<img width="1332" height="231" alt="image" src="https://github.com/user-attachments/assets/df8e0633-5d48-4a39-82f8-336457d76d74" />

As can be seen in the image above the results are dramatic between the first read and the second (over 20x faster results).

