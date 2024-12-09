
# S2.2. E-commerce

Aquest projecte és una aplicació web per a una botiga d'e-commerce. El seu objectiu és oferir una versió inicial que inclogui les funcions principals per a la gestió del carretó de la compra i l'aplicació de promocions. Aquesta demo està desenvolupada utilitzant HTML, CSS, i JavaScript amb un enfocament inicial en dades hardcodeades.

## Funcionalitats

### Nivell 1
1. **Afegir productes al carret**  
   Funció: `buy(productId)`  
   - Afegir un producte al carret.  
   - Si el producte ja hi és, incrementar la quantitat.  
   - Cada producte al carret té una propietat `quantity` per mantenir el recompte.

2. **Buidar el carret**  
   Funció: `cleanCart()`  
   - Reinicialitzar el carretó.

3. **Calcular l'import total**  
   Funció: `calculateTotal()`  
   - Calcular el cost total dels productes del carret.

4. **Aplicar promocions**  
   Funció: `applyPromotionsCart()`  
   - Promocions disponibles:  
     - Comprar 3 o més ampolles d'oli → 20% de descompte.  
     - Comprar 10 o més productes per a pastissos → 30% de descompte.  
   - Actualitzar el camp `subtotalWithDiscount` en els productes afectats.

5. **Mostrar el carret a l'usuari**  
   Funció: `printCart()`  
   - Mostrar els productes del carret en un modal amb la informació dinàmica.

6. **Validar el formulari de checkout**  
   Fitxer: `checkout.js`  
   - Condicions de validació:  
     - Tots els camps són obligatoris i han de tenir almenys 3 caràcters.  
     - Nom i cognoms: només lletres.  
     - Telèfon: només números.  
     - Contrasenya: ha d'incloure números i lletres.  
     - Email: format vàlid.  
   - Errors es mostren manipulant el DOM o amb la classe `is-invalid` de Bootstrap.

### Nivell 2
7. **Restar productes del carret**  
   Funció: `removeFromCart(productId)`  
   - Reduïr la quantitat d'un producte al carret.  
   - Si la quantitat arriba a 0, eliminar el producte del carret.  
   - Actualitzar les promocions després de cada canvi.

### Nivell 3
8. **Maquetació professional**  
   - Assegurar-se que la interfície tingui un aspecte professional i modern.

---

## Com començar

1. **Clonar el repositori**  
   ```
   git clone https://github.com/oscarrep/S2.2_E-Commerce
   cd S2.2_E-Commerce
   ```

2. **Executar el projecte**  
   - Obrir `index.html` en un navegador.

