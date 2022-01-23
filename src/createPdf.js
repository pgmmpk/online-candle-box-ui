import pdfMake from 'pdfmake/build/pdfmake';

pdfMake.fonts = {
    // download default Roboto font from cdnjs.com
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    },
};

export const fmtDate = date => (new Date(date)).toLocaleString();

export const parseItems = items => {
    const stats = {
        take: {},
        place: {},
    };
    const living = [];
    const deceased = [];
    let grossCandles = 0.;
    for (const item of items) {
        if (item.sku === 'names/living') {
            living.push(item.descr);
        } else if (item.sku === 'names/deceased') {
            deceased.push(item.descr);
        } else {
            const [candleType, place] = item.sku.split('/');
            stats.place[`${place}/${candleType}`] = +item.quantity + (stats.place[`${place}/${candleType}`] || 0);
            stats.take[candleType] = +item.quantity + (stats.take[candleType] || 0);
            grossCandles += +item.quantity * item.price;
        }
    }
    const take = Object.keys(stats.take).sort().map(x => ({ name: x, quantity: stats.take[x] }));
    const place = Object.keys(stats.place).sort().map(x => ({ name: x, quantity: stats.place[x] }));

    return {
        take, place, living, deceased, grossCandles,
    };
};

export const createPdf = ({ order, user }) => {
    const { take, place, living, deceased, grossCandles } = parseItems(order.items);

    const docDefinition = {
        info: {
            title: 'Online candle box report',
            author: 'St. Vladimir Memorial Church',
            subject: `Order #${order.id}`,
        },
        content: [
            { text: `Order #${order.id}`, style: 'header' },
            {
                layout: 'noBorders', // optional
                table: {
                    headerRows: 0,
                    widths: ['*', 'auto'],
                    body: [
                        ['Gross:', `$${(+order.gross).toFixed(2)} (candles: $${grossCandles.toFixed(2)}, names: $${(+order.gross-grossCandles).toFixed(2)})`],
                        ['Created:', `By ${order.createdBy} on ${fmtDate(order.timestamp)}`],
                        ['Period:', `${fmtDate(order.fromDate)} -- ${fmtDate(order.toDate)}`],
                    ]
                },
                margin: [0, 10, 0, 30],
            },
            {
                margin: [0, 10, 0, 30],
                columnGap: 25,
                columns: [
                    {
                        layout: 'headerLineOnly', // optional
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto'],
                            body: [
                                [{ text: 'Take', bold: true, fontSize: 14 }, ''],
                                ...take.map(x => [x.name, x.quantity])
                            ]
                        },
                    },
                    {
                        layout: 'headerLineOnly', // optional
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto'],
                            body: [
                                [{ text: 'Place', bold: true, fontSize: 14 }, ''],
                                ...place.map(x => [x.name, x.quantity])
                            ]
                        },
                    },
                ]
            },
            {
                margin: [0, 10, 0, 30],
                columnGap: 25,
                columns: [
                    {
                        layout: 'headerLineOnly', // optional
                        table: {
                            headerRows: 1,
                            widths: ['*'],
                            body: [
                                [{
                                    text: living.length ? 'Living' : '',
                                    bold: true,
                                    fontSize: 14,
                                }],
                                ...living.map(x => [x])
                            ]
                        },
                    },
                    {
                        layout: 'headerLineOnly', // optional
                        table: {
                            headerRows: 1,
                            widths: ['*'],
                            body: [
                                [{
                                    text: deceased.length ? 'Deceased' : '',
                                    bold: true,
                                    fontSize: 14,
                                }],
                                ...deceased.map(x => [x])
                            ]
                        },
                    },
                ]
            },
        ],
        footer: (currentPage, pageCount) => ({
            text: `Order #${order.id}, page ${currentPage} of ${pageCount} | printed by ${user}`,
            style: 'footer',
        }),
        styles: {
            header: {
                fontSize: 16,
                bold: true,
                margin: [0, 0, 0, 10],
            },
            footer: {
                alignment: 'center',
                margin: [0, 10, 0, 0],
                fontSize: 10,
            }
        },
        defaultStyle: {
            lineHeight: 1.25,
        }
    };

    return pdfMake.createPdf(docDefinition);
};
