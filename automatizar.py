"""
automatizar.py — Pampa Nusta
Ejecuta el build y el deploy a Vercel sin necesidad de confirmaciones manuales.
Captura la URL del nuevo deployment y reasigna el alias del dominio principal.
Uso: python automatizar.py
"""

import subprocess
import sys
import re

# Forzar UTF-8 en Windows para evitar errores de encoding
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

PROJECT_DIR = r"C:\Users\ASUS\Downloads\pampa-ñusta---pisac (2)"
DOMINIO_PRINCIPAL = "pampa-nusta-pisac.vercel.app"

def log(msg):
    print(f">>> {msg}")

def run(cmd, desc):
    log(desc)
    result = subprocess.run(
        cmd,
        cwd=PROJECT_DIR,
        shell=True,
    )
    if result.returncode != 0:
        print(f"[ERROR] Fallo en: {desc}")
        sys.exit(1)
    print(f"[OK] {desc}\n")

def run_capture(cmd, desc):
    """Ejecuta un comando y captura su salida."""
    log(desc)
    result = subprocess.run(
        cmd,
        cwd=PROJECT_DIR,
        shell=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if result.returncode != 0:
        print(f"[ERROR] Fallo en: {desc}")
        print(result.stderr)
        sys.exit(1)
    print(result.stdout)
    print(f"[OK] {desc}\n")
    return result.stdout

# --- SECUENCIA COMPLETA -------------------------------------------------------
if __name__ == "__main__":
    print("\n" + "="*55)
    print("  PAMPA NUSTA -- Deploy Automatico a Vercel")
    print("="*55 + "\n")

    # 1. Instalar dependencias
    run("npm install --legacy-peer-deps", "Instalando dependencias (npm install)")

    # 2. Build de produccion
    run("npm run build", "Compilando proyecto React -> /dist")

    # 3. Deploy a Vercel sin preguntas (capturando URL del nuevo deployment)
    output = run_capture("npx vercel --prod --yes", "Desplegando en Vercel (produccion)")

    # 4. Extraer URL del nuevo deployment de la salida
    match = re.search(r"https://pampa-nusta-pisac-[a-z0-9]+-lifextremes-projects\.vercel\.app", output)
    if match:
        nueva_url = match.group(0)
        log(f"Nuevo deployment detectado: {nueva_url}")
        # 5. Reasignar alias del dominio principal al nuevo deployment
        run(
            f"npx vercel alias set {nueva_url} {DOMINIO_PRINCIPAL}",
            f"Actualizando alias: {DOMINIO_PRINCIPAL} -> nuevo deployment"
        )
    else:
        print("[AVISO] No se pudo detectar la URL del nuevo deployment para actualizar el alias.")
        print("        Puede que el alias ya este actualizado, o verifica manualmente en Vercel.")

    print("\n" + "="*55)
    print("  Deploy completado exitosamente.")
    print(f"  Sitio en vivo: https://{DOMINIO_PRINCIPAL}")
    print("="*55 + "\n")
