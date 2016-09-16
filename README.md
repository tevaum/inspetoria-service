# Inspetoria Online - Service

_Inspetoria Online_ is a web application to help my wife with her job of visiting schools to check if they are following State's legislation (and advise them in case they're not).

This repository contains an express application that is responsible for serving an Angular2 application and a REST API used by the angular application to store and retrieve data.

Basically, an **Admin** or **Inspetor** user is able to add schools and users (and associate users to schools). The next step is to schedule visits to the schools and record activities for each visit, so that the **Inspetor** can (in the future) generate the necessary reports for the job.

It uses _passport_ for authentication and _sequelize_ for database access. Code is written in *typescript*.
