<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    # Crea el switch
    
    $opcio = rand(1, 5);
    echo $opcio . "<br>";
    $resultat;

    switch ($opcio) {
        case 1:
            $resultat = suma();
            break;
        case 2:
            $resultat = resta();
            break;
        case 3:
            $resultat = multiplica();
            break;
        case 4:
            $resultat = divideix();
            break;
        default:
            $resultat = raiz();
    }

    echo $resultat;

    function suma()
    {
        return rand() + rand();
    }

    function resta()
    {
        $var1 = rand();
        return rand() - $var1;
    }

    function multiplica()
    {
        return rand() * rand();
    }

    function divideix()
    {
        return rand(1, 1000000000000000000) / rand(1, 100000000000000000);
    }

    function raiz()
    {
        return sqrt(rand());
    }

    ?>
</body>

</html>