# bitinfocharts-price-scraper

bitinfocharts-price-scraper(bic-scraper) is a basic web application that scrapes prices off of bitinfocharts.com and generates a table of prices. 

The final functionality of this app will ideally to be a complete web application that can run on a raspberry pi and automatically retreive prices. Then it visualizes the data for the user. As of now, this is in an extremely early stage, and it barely achieves the basic required functionality. 

### Example

![Mainpage](https://raw.githubusercontent.com/ryanmdo/bitinfocharts-price-scraper/master/github-images/mainpage.png)

The application hsa one button which is found in the header panel. It simple retrieves the price, and posts it to the mongo database.


##### Current Bugs/Issues

There are numerous issues that need to be resolved.
  - The first of which is the error whereby bitfenix's price is used all 5 times. Either all 5 prices from the exchanges are shown, or only the average of them.
  - User is required to refresh after the updating the prices
  - Possible switch into mysql for the database. Seems more appropriate for this data
  - Be able to choose various cryptocurrencies