
exports.home=(req,res,next)=>{
    res.status(200).send(
        {
            '/':'GET || Welcome page',
            '/summary': 'GET || Overall global reports',
            '/countries':'GET || All countries represented in the API',
            '/historical/:country':'GET || Total cases per country since first reported case',
            'country-data':'GET || Total reports for all the countries',
            'country-data/:country':'GET || Total reports for an individual countries',
            '/continents':'GET || Names of represented continents and format',
            '/continents/:continent': 'GET || Total reports per continent',
            '/east-africa-data':'GET || Total reports for East African countries',
            '/country-data/top-10-confirmed':'GET || Top ten countries with most confirmed cases',
            '/country-data/top-10-recovered':'GET || Top ten countries with most recovered cases',
            '/country-data/top-10-deaths':'GET || Top ten countries with most deaths'


        }
    )

}