import Document, {Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html style={{backgroundColor:'#fafbfe !important'}}>
            <Head>
                <link rel="stylesheet" href="/adminlte/plugins/fontawesome-free/css/all.min.css" />
                <link rel="stylesheet" href="/adminlte/dist/css/adminlte.min.css" />
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <script src="https://cdn.shopify.com/s/assets/external/app.js"></script>

                <link href="/styles.css" />
                <link href="/webfont.css"/>
                
                <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap" rel="stylesheet"/>
                <script src="/adminlte/plugins/jquery/jquery.min.js"></script>
                <script src="/adminlte/plugins/bootstrap/js/bootstrap.bundle.js"></script>
                <script src="/adminlte/dist/js/adminlte.js"></script>

            </Head>
            <body className="hold-transition layout-top-nav layout-fixed layout-navbar-fixed">
                <div className="wrapper">
                    <Main/>
                    <NextScript/> 
                </div>
            </body>
            </html>
        )
    }
}