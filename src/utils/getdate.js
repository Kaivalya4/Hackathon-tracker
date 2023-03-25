export default function getdate(strdate) {
    return new Date(
        strdate.substring(5, 7) +
            "/" +
            strdate.substring(8, 10) +
            "/" +
            strdate.substring(0, 4)
    );
}
