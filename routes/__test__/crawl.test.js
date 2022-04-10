const request = require('supertest');
const app = require('../../app');

it('responds with reviews', async () => {
  const response = await request(app)
    .get(
      '/crawl?url=https://www.tigerdirect.com/applications/searchtools/item-details.asp?EdpNo=607601&pagenumber=1&RSort=1&csid=ITD&recordsPerPage=5&body=REVIEWS#CustomerReviewsBlock'
    )
    .send()
    .expect(200);

  expect(JSON.stringify(response.body)).toEqual(
    JSON.stringify({
      productName:
        'HP EliteDesk 800 G1 USFF Desktop PC - Intel Core i5-4570S 2.9GHz Quad-Core, 8GB DDR3, 256GB SSD, GigE, VGA, 4x USB 3.0, Windows 10 Pro 64-bit, 1 Year Warranty, Grade A Refurbished - RB-724962753063',
      overallRating: 4.2,
      reviews: [
        {
          comment: {
            heading: 'Did not work Right Out of box',
            message:
              'Would love to give this product a review but it did not work straight out of box. If it was refurbished, they apparently did not test it.  Still working with the support team to resolve or return.  But all done by email, tedious and time consuming.',
          },
          rating: 1,
          reviewDate: 'Apr 07, 2022',
          reviewerName: 'Cousa1',
        },
        {
          comment: {
            heading: 'WELL DESERVED 4.9',
            message:
              "After having bad luck with refurbished purchases this was a pleasant surprise. It was professionally packaged and in like new condition. While it doesn't have built in wifi or bluetooth those are easily added.  So far a very good purchasing experience.\n",
          },
          rating: 4.5,
          reviewDate: 'Apr 03, 2022',
          reviewerName: 'RON,',
        },
        {
          comment: {
            heading: 'Excellent Machine',
            message:
              "The machine is fast, as expected. The drive is over twice as fast as any on my other machines. Very small, so can't add any internal drives without removing the DVD drive. The Win10 is a Win8 upgrade, but no problems. You can get the code using Belarc Advisor. Haven't had it long, but have done a lot of work on it getting it ready for my sister-in-law. So far, highly recommended.",
          },
          rating: 5,
          reviewDate: 'Jan 07, 2022',
          reviewerName: 'jon2121,',
        },
        {
          comment: {
            heading: 'Very good for the money',
            message:
              'Boots in under 15 seconds . Plenty of USB ports and has VGA and direct ports.',
          },
          rating: 5,
          reviewDate: 'Mar 15, 2021',
          reviewerName: ',',
        },
        {
          comment: {
            heading: 'EXCELLANT FOR THE MONEY',
            message:
              'FAST BOOT, WORKS AS EXPECTED. HAS PLENTY OF PORTS FOR MOST PEOPLE. HAVE MINE WIRED DIRECT BUT HAS WIFI. 8 GB RAM GOOD FOR MOST UPGRADABLE TO 16 GB. HAVE HAD NO TROUBLE, USED FOR ABOUT 6 MONTHS NOW. WOULD DEFINITLY BUY AGAIN.',
          },
          rating: 5,
          reviewDate: 'Mar 14, 2021',
          reviewerName: 'MIKE,',
        },
      ],
    })
  );
});

it('responds with bad input if url is incorrect', async () => {
  await request(app).get('/crawl?url=test').send().expect(400);

  await request(app)
    .get('/crawl?url=https://www.google.com')
    .send()
    .expect(400);
});
