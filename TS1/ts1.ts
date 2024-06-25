function enviar(): void {
    const raioInput = document.getElementById("raio") as HTMLInputElement;
    const raio = raioInput.value;

    const r = Number(raio);
    const area = Math.PI * (r ** 2);
    const circu = 2 * Math.PI * r;

    const areaOutput = document.getElementById("area") as HTMLInputElement;
    const circOutput = document.getElementById("circ") as HTMLInputElement;

    areaOutput.value = (Math.round(area * 100) / 100).toString();
    circOutput.value = (Math.round(circu * 100) / 100).toString();
}
