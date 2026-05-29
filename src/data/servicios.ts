/**
 * Datos centralizados de los servicios.
 *
 * Todos los servicios comparten la misma estructura de página, por lo que se
 * renderizan con una única plantilla: src/pages/servicios/[slug].astro
 *
 * Para añadir un servicio nuevo basta con agregar un objeto `Service` a este
 * array: su página y su URL (/servicios/{slug}) se generan automáticamente.
 */

export interface ServiceListItem {
    title: string;
    description: string;
}

export interface ServiceBenefit {
    /** Emoji usado como icono de la tarjeta. */
    icon: string;
    title: string;
    description: string;
}

export interface ServiceStep {
    title: string;
    description: string;
}

export interface ServiceFaq {
    question: string;
    answer: string;
}

/** Referencia a otro servicio (la tarjeta de "servicios relacionados"). */
export interface ServiceRelatedRef {
    /** slug del servicio referenciado. El título se resuelve desde sus datos. */
    slug: string;
    /** Descripción contextual: por qué se relaciona con el servicio actual. */
    description: string;
}

export interface Service {
    /** Identificador en la URL: /servicios/{slug}. Debe ser único. */
    slug: string;
    /** Nombre corto del servicio (tarjetas de relacionados, índices, etc.). */
    name: string;
    /** Metadatos SEO de la página. */
    seo: {
        title?: string;
        description: string;
    };
    hero: {
        h1: string;
        subtitle: string;
        bgImage: string;
    };
    intro: {
        title: string;
        /** Párrafos en HTML: admiten etiquetas como <b>. */
        paragraphs: string[];
        image: string;
        imageAlt: string;
    };
    includes: {
        title: string;
        intro?: string;
        items: ServiceListItem[];
    };
    problems: {
        title: string;
        intro?: string;
        items: ServiceListItem[];
    };
    benefits: {
        title: string;
        items: ServiceBenefit[];
    };
    process: {
        title: string;
        steps: ServiceStep[];
    };
    faq: {
        title: string;
        items: ServiceFaq[];
    };
    related: ServiceRelatedRef[];
    cta: {
        title: string;
        text: string;
    };
}

export const services: Service[] = [
    {
        slug: "averias-electricas-sevilla",
        name: "Averías eléctricas",
        seo: {
            description:
                "Electricista para averías eléctricas en Sevilla. Reparamos cortocircuitos, fallos de corriente, fusibles, diferenciales y magnetotérmicos con diagnóstico rápido y garantía.",
        },
        hero: {
            h1: "Averías Eléctricas en Sevilla",
            subtitle:
                "Diagnóstico rápido y reparación profesional de cualquier fallo eléctrico en tu vivienda o local. Recuperamos tu suministro con garantía y respaldo técnico.",
            bgImage: "/assets/worksSection/reparaciones.webp",
        },
        intro: {
            title: "Reparación de averías eléctricas con respuesta inmediata",
            paragraphs: [
                "Una avería eléctrica es siempre un problema urgente. Una vivienda sin luz, un local que no puede abrir o un comercio con un cuadro que salta sin parar pierde tiempo, dinero y tranquilidad.",
                "En <b>Instalaciones Eléctricas Jesús Gómez</b> ofrecemos servicio de reparación de averías eléctricas en Sevilla y toda la provincia, con técnicos cualificados que localizan el origen del fallo y lo solucionan a la primera, sin parches ni soluciones temporales.",
                "Trabajamos con particulares, comunidades de vecinos, oficinas y negocios. Si tu instalación tiene un comportamiento extraño, no esperes: una avería sin atender puede derivar en daños mayores e incluso en riesgo de incendio.",
            ],
            image: "/assets/worksSection/reparaciones.webp",
            imageAlt: "Electricista reparando una avería eléctrica en Sevilla",
        },
        includes: {
            title: "Qué reparamos",
            intro: "Cubrimos cualquier tipo de avería eléctrica residencial, comercial o industrial.",
            items: [
                {
                    title: "Fusibles, magnetotérmicos y diferenciales",
                    description:
                        "Sustitución de elementos de protección que saltan con frecuencia o que han dejado de hacer su función.",
                },
                {
                    title: "Cortocircuitos",
                    description:
                        "Localización del punto exacto del cortocircuito en cableado, mecanismos o aparatos conectados, y resolución segura.",
                },
                {
                    title: "Sobretensiones",
                    description:
                        "Reparación de daños causados por subidas de tensión e instalación de protectores para evitar nuevos episodios.",
                },
                {
                    title: "Tomas de tierra deficientes",
                    description:
                        "Comprobación, medición y mejora de la puesta a tierra cuando no cumple con la normativa.",
                },
                {
                    title: "Fallos de corriente",
                    description:
                        "Diagnóstico de zonas sin luz, enchufes que no dan tensión o circuitos que se quedan sin servicio sin causa aparente.",
                },
                {
                    title: "Enchufes e interruptores",
                    description:
                        "Reparación o sustitución de mecanismos rotos, quemados, que chispean o que ya no hacen contacto.",
                },
            ],
        },
        problems: {
            title: "Situaciones en las que nos llaman",
            intro: "Si reconoces alguna de estas situaciones, es momento de revisar tu instalación.",
            items: [
                {
                    title: "El diferencial salta una y otra vez",
                    description:
                        "Puede ser una derivación a tierra, humedad en una caja de registro o un electrodoméstico dañado. Lo localizamos con instrumental específico.",
                },
                {
                    title: "Huele a quemado en un enchufe o cuadro",
                    description:
                        "Es una señal de alarma. Indica un punto caliente que puede derivar en incendio. Hay que actuar de inmediato.",
                },
                {
                    title: "Se ha quedado sin luz una parte de la casa",
                    description:
                        "Cuando una habitación o un circuito completo deja de funcionar, suele haber un punto roto en cableado o un magnetotérmico fundido.",
                },
                {
                    title: "Tras una tormenta, varios aparatos no funcionan",
                    description:
                        "Una sobretensión puede dañar electrodomésticos, router, alarma o aire acondicionado. Reparamos y protegemos la instalación.",
                },
                {
                    title: "Las luces parpadean o bajan de intensidad",
                    description:
                        "Suele indicar conexiones flojas, sobrecarga de circuito o problemas en el cuadro general.",
                },
                {
                    title: "Notas calambres al tocar un grifo o electrodoméstico",
                    description:
                        "Síntoma claro de toma de tierra deficiente. Es un riesgo eléctrico real y debe revisarse cuanto antes.",
                },
            ],
        },
        benefits: {
            title: "Por qué confiar en nosotros",
            items: [
                {
                    icon: "⚡",
                    title: "Respuesta rápida en Sevilla",
                    description:
                        "Atendemos avisos el mismo día siempre que es posible y priorizamos urgencias.",
                },
                {
                    icon: "🔍",
                    title: "Diagnóstico real, no estimaciones",
                    description:
                        "Localizamos el origen del fallo antes de tocar nada. Sin pruebas a ciegas ni recambios innecesarios.",
                },
                {
                    icon: "🛡️",
                    title: "Reparaciones con garantía",
                    description:
                        "Cumplimos REBT y dejamos por escrito el trabajo realizado.",
                },
                {
                    icon: "💶",
                    title: "Presupuesto claro",
                    description:
                        "Te explicamos qué tiene tu instalación y cuánto cuesta antes de empezar.",
                },
                {
                    icon: "👷",
                    title: "Electricistas autorizados",
                    description:
                        "Profesionales con experiencia en residencial, comunidades y locales comerciales.",
                },
                {
                    icon: "📍",
                    title: "Cobertura en toda Sevilla",
                    description:
                        "Sevilla capital, Dos Hermanas, Mairena del Aljarafe, Alcalá de Guadaíra y resto de provincia.",
                },
            ],
        },
        process: {
            title: "Cómo trabajamos una avería",
            steps: [
                {
                    title: "Aviso y primera valoración por teléfono",
                    description:
                        "Nos cuentas qué pasa y te orientamos sobre la urgencia y los pasos a seguir hasta nuestra llegada.",
                },
                {
                    title: "Diagnóstico en tu domicilio",
                    description:
                        "Revisamos la instalación con instrumental adecuado (pinza, polímetro, comprobador de aislamiento) y localizamos el fallo.",
                },
                {
                    title: "Presupuesto cerrado",
                    description:
                        "Te explicamos el problema, las opciones y el coste antes de tocar nada. Sin sorpresas en la factura.",
                },
                {
                    title: "Reparación",
                    description:
                        "Solucionamos la avería con materiales homologados y dejamos la instalación funcionando con seguridad.",
                },
                {
                    title: "Comprobación final y garantía",
                    description:
                        "Probamos el circuito, verificamos protecciones y te entregamos el trabajo por escrito.",
                },
            ],
        },
        faq: {
            title: "Preguntas frecuentes",
            items: [
                {
                    question: "¿Atendéis averías el mismo día en Sevilla?",
                    answer: "Sí. Siempre que la agenda lo permite atendemos el aviso el mismo día y priorizamos las urgencias (sin suministro, olor a quemado, riesgo evidente). Llámanos al 691 88 63 70 para coordinar.",
                },
                {
                    question: "¿Cuánto cuesta reparar una avería eléctrica?",
                    answer: "Depende del tipo de fallo y del tiempo de localización. Antes de empezar la reparación te damos un presupuesto cerrado, para que sepas exactamente cuánto vas a pagar.",
                },
                {
                    question:
                        "Si el diferencial salta, ¿es siempre una avería grave?",
                    answer: "No siempre, pero hay que descartar fugas y derivaciones a tierra. Volver a subirlo una y otra vez sin diagnóstico puede ser peligroso. Mejor revisarlo.",
                },
                {
                    question: "¿Trabajáis en comunidades de vecinos?",
                    answer: "Sí. Atendemos averías en zonas comunes, garajes, alumbrado de escalera, porteros automáticos y cuadros generales.",
                },
                {
                    question: "¿Dejáis garantía por escrito?",
                    answer: "Sí. Entregamos albarán detallado de los trabajos realizados y materiales empleados, con garantía de la reparación.",
                },
                {
                    question:
                        "¿Puedo seguir usando la instalación hasta que lleguéis?",
                    answer: "Si hay olor a quemado, chispas o el diferencial salta de inmediato al subirlo, no la uses. Es preferible esperar a la revisión antes que arriesgarse a un incendio.",
                },
            ],
        },
        related: [
            {
                slug: "cuadros-electricos-sevilla",
                description:
                    "Cambio y reforma de cuadros antiguos por modelos modernos y seguros.",
            },
            {
                slug: "boletines-electricos-sevilla",
                description:
                    "CIE, certificados y legalización de instalaciones antiguas.",
            },
            {
                slug: "mantenimiento-electrico-sevilla",
                description:
                    "Revisiones periódicas para evitar averías antes de que ocurran.",
            },
        ],
        cta: {
            title: "¿Tienes una avería eléctrica ahora mismo?",
            text: "No esperes a que el problema vaya a más. Llámanos, escríbenos por WhatsApp o pide presupuesto y te atendemos lo antes posible.",
        },
    },
    {
        slug: "boletines-electricos-sevilla",
        name: "Boletines y legalizaciones",
        seo: {
            description:
                "Tramitamos boletines eléctricos, certificados CIE, aumentos de potencia y legalización de instalaciones en Sevilla. Instalador autorizado con experiencia.",
        },
        hero: {
            h1: "Boletines Eléctricos, CIE y Legalizaciones en Sevilla",
            subtitle:
                "Tramitamos tu certificado eléctrico, aumento de potencia o legalización de la instalación con todas las garantías. Instalador autorizado por la Junta de Andalucía.",
            bgImage: "/assets/worksSection/certificaciones.webp",
        },
        intro: {
            title: "Tu instalación, en regla con normativa",
            paragraphs: [
                "El <b>Certificado de Instalación Eléctrica (CIE)</b>, conocido popularmente como boletín eléctrico, es el documento oficial que acredita que tu instalación cumple con el Reglamento Electrotécnico de Baja Tensión (REBT). Sin él no se puede dar de alta el suministro ni cambiar de comercializadora en muchos casos.",
                "En <b>Instalaciones Eléctricas Jesús Gómez</b> emitimos boletines, certificados CIE, gestionamos aumentos de potencia y legalizamos instalaciones antiguas o sin documentación en Sevilla y provincia.",
                "Nos encargamos de todo el trámite: inspección, redacción del certificado, comunicación con la comercializadora y registro en la Junta de Andalucía. Tú solo tienes que firmar.",
            ],
            image: "/assets/worksSection/certificaciones.webp",
            imageAlt:
                "Certificado eléctrico CIE emitido por instalador autorizado en Sevilla",
        },
        includes: {
            title: "Qué tramitamos",
            items: [
                {
                    title: "Certificado CIE para alta de luz",
                    description:
                        "Boletín obligatorio para dar de alta el suministro en vivienda nueva, segunda vivienda o local que lleve tiempo sin servicio.",
                },
                {
                    title: "Aumento de potencia contratada",
                    description:
                        "Tramitamos la documentación para subir la potencia (por ejemplo, para instalar aire acondicionado, vitrocerámica o un punto de recarga).",
                },
                {
                    title: "Legalización de instalaciones antiguas",
                    description:
                        "Adaptamos al REBT viviendas y locales sin boletín o con instalación obsoleta para que puedan ser legalizadas.",
                },
                {
                    title: "Revisión de instalaciones",
                    description:
                        "Inspección completa para detectar puntos que incumplen normativa antes de emitir el certificado.",
                },
                {
                    title: "Boletín para cambio de titular",
                    description:
                        "Necesario cuando la compañía solicita un nuevo CIE tras un cambio de propiedad o de comercializadora.",
                },
                {
                    title: "Memoria técnica de diseño (MTD)",
                    description:
                        "Para instalaciones que por potencia o uso requieran proyecto o memoria adicional según REBT.",
                },
            ],
        },
        problems: {
            title: "Cuándo necesitas un boletín",
            items: [
                {
                    title: "Te has mudado a una vivienda y la luz está dada de baja",
                    description:
                        "Si han pasado más de 12 meses sin suministro, la compañía exigirá CIE para reactivar la luz.",
                },
                {
                    title: "Vas a abrir un local o cambiar su actividad",
                    description:
                        "Cualquier local nuevo o con cambio de uso necesita certificado eléctrico que valide su instalación.",
                },
                {
                    title: "Quieres subir la potencia contratada",
                    description:
                        "Para instalar electrodomésticos potentes, climatización o un wallbox, en muchos casos hay que aumentar potencia y aportar boletín.",
                },
                {
                    title: "Tu instalación es muy antigua y no tienes papeles",
                    description:
                        "Si la vivienda es anterior al actual REBT o nunca se legalizó, hay que adaptarla y emitir certificado.",
                },
                {
                    title: "Has hecho una reforma eléctrica",
                    description:
                        "Toda reforma que afecte al cuadro general o aumente circuitos requiere nuevo certificado de instalación.",
                },
                {
                    title: "La compañía te ha pedido un CIE",
                    description:
                        "Iberdrola, Endesa u otra comercializadora puede solicitar el documento en cualquier alta, baja o cambio de titular.",
                },
            ],
        },
        benefits: {
            title: "Por qué tramitarlo con nosotros",
            items: [
                {
                    icon: "📜",
                    title: "Instalador autorizado",
                    description:
                        "Certificados emitidos por profesional habilitado y registrados oficialmente en la Junta de Andalucía.",
                },
                {
                    icon: "⏱️",
                    title: "Trámite ágil",
                    description:
                        "Inspeccionamos, certificamos y registramos en plazos cortos para que el alta no se retrase.",
                },
                {
                    icon: "📋",
                    title: "Todo el papeleo lo hacemos nosotros",
                    description:
                        "Nos ocupamos del envío a la comercializadora y del registro. Tú no tienes que ir a ningún sitio.",
                },
                {
                    icon: "✅",
                    title: "Solución si no cumple",
                    description:
                        "Si la instalación no está en regla, te decimos exactamente qué arreglar y lo dejamos legalizable.",
                },
                {
                    icon: "💼",
                    title: "Particulares, locales y comunidades",
                    description:
                        "Emitimos boletines para vivienda, local comercial, oficina, garaje y zonas comunes.",
                },
                {
                    icon: "📍",
                    title: "Cobertura provincial",
                    description:
                        "Sevilla capital y resto de municipios de la provincia.",
                },
            ],
        },
        process: {
            title: "Cómo lo gestionamos",
            steps: [
                {
                    title: "Llamada inicial",
                    description:
                        "Nos cuentas el motivo (alta, cambio de potencia, local nuevo, etc.) y revisamos qué documentación necesitas.",
                },
                {
                    title: "Inspección presencial",
                    description:
                        "Visitamos la instalación, comprobamos protecciones, cuadro, tomas de tierra y secciones de cable.",
                },
                {
                    title: "Adaptación si hace falta",
                    description:
                        "Si algo no cumple REBT, te damos presupuesto detallado para dejarla en regla antes del certificado.",
                },
                {
                    title: "Emisión y registro del CIE",
                    description:
                        "Redactamos el boletín, lo firmamos como instalador autorizado y lo registramos oficialmente.",
                },
                {
                    title: "Entrega y tramitación con la compañía",
                    description:
                        "Te entregamos copia y, si lo necesitas, enviamos el documento directamente a tu comercializadora.",
                },
            ],
        },
        faq: {
            title: "Preguntas frecuentes sobre boletines eléctricos",
            items: [
                {
                    question:
                        "¿Cuánto tarda en emitirse un boletín eléctrico?",
                    answer: "Si la instalación está en buen estado, podemos emitirlo en pocos días desde la visita. Si hay que hacer adaptaciones, el plazo depende del alcance de los trabajos.",
                },
                {
                    question:
                        "¿Cuánto cuesta un boletín eléctrico en Sevilla?",
                    answer: "El precio varía según el tipo de inmueble, la potencia y si hay que adaptar la instalación. Te damos presupuesto cerrado tras la visita técnica.",
                },
                {
                    question: "¿Cuándo caduca un boletín eléctrico?",
                    answer: "Un CIE no caduca con una fecha fija, pero la compañía suele exigir uno actualizado si han pasado más de 20 años o si se ha modificado la instalación.",
                },
                {
                    question: "¿Puedo emitir yo mismo un boletín?",
                    answer: "No. Solo lo puede emitir un instalador eléctrico autorizado, inscrito en el registro oficial. Nosotros lo estamos.",
                },
                {
                    question:
                        "Mi instalación es muy antigua, ¿puede legalizarse?",
                    answer: "En la mayoría de casos sí, adaptando lo necesario al REBT vigente. Te indicamos qué cambios son obligatorios y cuáles son recomendables.",
                },
                {
                    question:
                        "¿Tramitáis también el aumento de potencia con la compañía?",
                    answer: "Sí, junto con el boletín preparamos la solicitud para que la subida de potencia se haga sin retrasos.",
                },
            ],
        },
        related: [
            {
                slug: "cuadros-electricos-sevilla",
                description:
                    "Sustitución de cuadros antiguos para que la instalación pueda legalizarse.",
            },
            {
                slug: "instalaciones-electricas-sevilla",
                description:
                    "Instalaciones completas en vivienda y local con boletín incluido.",
            },
            {
                slug: "punto-recarga-coche-electrico-sevilla",
                description:
                    "Wallbox con su correspondiente legalización y aumento de potencia si procede.",
            },
        ],
        cta: {
            title: "¿Necesitas un boletín o legalizar tu instalación?",
            text: "Llámanos y te asesoramos en pocos minutos sobre el trámite que necesitas y cuánto cuesta.",
        },
    },
    {
        slug: "cuadros-electricos-sevilla",
        name: "Cuadros eléctricos",
        seo: {
            description:
                "Cambio y montaje de cuadros eléctricos en Sevilla. Magnetotérmicos, diferenciales, protección contra sobretensiones e instalaciones monofásicas o trifásicas.",
        },
        hero: {
            h1: "Cuadros Eléctricos en Sevilla",
            subtitle:
                "Reforma, sustitución y modernización de cuadros eléctricos. Protección actualizada según REBT, con magnetotérmicos, diferenciales y protectores contra sobretensiones.",
            bgImage: "/assets/worksSection/tomas.webp",
        },
        intro: {
            title: "El corazón eléctrico de tu vivienda o negocio",
            paragraphs: [
                "El cuadro eléctrico es el elemento clave de toda instalación: protege a las personas, a los aparatos y al cableado frente a sobrecargas, cortocircuitos y derivaciones. Un cuadro obsoleto es un riesgo silencioso que solo se manifiesta cuando algo va mal.",
                "En <b>Instalaciones Eléctricas Jesús Gómez</b> realizamos la <b>sustitución completa de cuadros eléctricos en Sevilla</b>, tanto en viviendas como en locales, oficinas, naves y comunidades. Dimensionamos cada elemento según el uso real para que la instalación sea segura, ordenada y preparada para futuras ampliaciones.",
                "Trabajamos con instalaciones monofásicas y trifásicas y montamos protecciones específicas frente a sobretensiones para evitar daños en electrodomésticos, climatización y equipos electrónicos.",
            ],
            image: "/assets/worksSection/tomas.webp",
            imageAlt: "Cuadro eléctrico nuevo instalado en Sevilla",
        },
        includes: {
            title: "Qué hacemos con tu cuadro",
            items: [
                {
                    title: "Reforma integral de cuadros antiguos",
                    description:
                        "Sustituimos cuadros con plomos o ICP antiguo por cuadros modernos, modulares y conformes a REBT.",
                },
                {
                    title: "Magnetotérmicos y diferenciales",
                    description:
                        "Montamos los elementos de protección adecuados a cada circuito, con curva y sensibilidad correctas.",
                },
                {
                    title: "Protección contra sobretensiones",
                    description:
                        "Instalación de protectores transitorios y permanentes para evitar daños en electrónica por subidas de tensión y rayos.",
                },
                {
                    title: "Instalaciones monofásicas",
                    description:
                        "Cuadros estándar para vivienda y pequeño comercio con la potencia adecuada al uso real.",
                },
                {
                    title: "Instalaciones trifásicas",
                    description:
                        "Cuadros trifásicos para naves, talleres y locales con maquinaria o consumo elevado.",
                },
                {
                    title: "Etiquetado y orden de circuitos",
                    description:
                        "Dejamos cada circuito identificado para que cualquier intervención futura sea rápida y segura.",
                },
            ],
        },
        problems: {
            title: "Señales de que tu cuadro necesita reforma",
            items: [
                {
                    title: "Aún tienes plomos o fusibles de porcelana",
                    description:
                        "Esta tecnología está obsoleta y no protege correctamente. Es uno de los motivos más frecuentes para no poder legalizar la vivienda.",
                },
                {
                    title: "El cuadro no tiene diferencial",
                    description:
                        "Sin diferencial no hay protección frente a contactos eléctricos. Es obligatorio según REBT.",
                },
                {
                    title: "Los magnetotérmicos saltan con frecuencia",
                    description:
                        "Puede deberse a circuitos infradimensionados o protecciones mal escogidas para el consumo real.",
                },
                {
                    title: "Vas a instalar aire acondicionado, vitro o wallbox",
                    description:
                        "Estos consumos suelen requerir nuevo circuito independiente y, a menudo, cuadro nuevo.",
                },
                {
                    title: "El cuadro huele a quemado o está descolorido",
                    description:
                        "Indica recalentamiento. Es una señal de alarma que exige revisión urgente.",
                },
                {
                    title: "Tu negocio crece y necesitas trifásica",
                    description:
                        "Cambiar de monofásica a trifásica permite repartir cargas y trabajar con maquinaria de mayor potencia.",
                },
            ],
        },
        benefits: {
            title: "Ventajas de un cuadro renovado",
            items: [
                {
                    icon: "🔒",
                    title: "Seguridad real para las personas",
                    description:
                        "Diferenciales bien calibrados que disparan a tiempo y evitan accidentes eléctricos.",
                },
                {
                    icon: "⚡",
                    title: "Protección contra sobretensiones",
                    description:
                        "Tus electrodomésticos y electrónica quedan protegidos frente a picos y rayos.",
                },
                {
                    icon: "📋",
                    title: "Cumplimiento normativo",
                    description:
                        "Cuadro conforme a REBT, listo para emitir certificado eléctrico (CIE).",
                },
                {
                    icon: "🧩",
                    title: "Preparado para ampliaciones",
                    description:
                        "Dejamos espacio libre y previsiones para futuros circuitos sin tener que rehacer la instalación.",
                },
                {
                    icon: "🧹",
                    title: "Acabado limpio y ordenado",
                    description:
                        "Cableado peinado, etiquetado claro y carátula nueva. La instalación se ve y se mantiene mejor.",
                },
                {
                    icon: "💡",
                    title: "Mejor rendimiento",
                    description:
                        "Menos disparos innecesarios y menos pérdidas por conexiones flojas o material antiguo.",
                },
            ],
        },
        process: {
            title: "Nuestro proceso de cambio de cuadro",
            steps: [
                {
                    title: "Estudio de la instalación",
                    description:
                        "Analizamos potencia, circuitos existentes, consumos previstos y estado del cableado.",
                },
                {
                    title: "Diseño del nuevo cuadro",
                    description:
                        "Calculamos protecciones, separamos circuitos y prevemos espacio para futuras ampliaciones.",
                },
                {
                    title: "Presupuesto cerrado",
                    description:
                        "Te entregamos el detalle de materiales y mano de obra antes de empezar.",
                },
                {
                    title: "Montaje en obra",
                    description:
                        "Sustituimos el cuadro minimizando el tiempo sin luz, etiquetamos circuitos y dejamos todo probado.",
                },
                {
                    title: "Comprobaciones y boletín",
                    description:
                        "Medimos aislamiento, tierra y disparo del diferencial. Si lo necesitas, emitimos el certificado eléctrico.",
                },
            ],
        },
        faq: {
            title: "Preguntas frecuentes sobre cuadros eléctricos",
            items: [
                {
                    question:
                        "¿Cuánto se tarda en cambiar un cuadro eléctrico?",
                    answer: "Un cambio de cuadro estándar en vivienda suele hacerse en una jornada de trabajo. Locales y trifásicas pueden requerir más tiempo según el alcance.",
                },
                {
                    question: "¿Tendré que estar muchas horas sin luz?",
                    answer: "Planificamos el corte para que sea el mínimo imprescindible. En la mayoría de viviendas el suministro vuelve el mismo día.",
                },
                {
                    question:
                        "¿Es obligatorio el protector de sobretensiones?",
                    answer: "Según el REBT, en muchas instalaciones nuevas o reformas importantes es obligatorio. Además, es muy recomendable por la cantidad de electrónica sensible que hay en casa hoy en día.",
                },
                {
                    question: "¿Puedo pasar de monofásica a trifásica?",
                    answer: "Sí, siempre que la compañía pueda suministrarla en tu zona. Hay que tramitar el cambio con la distribuidora y adaptar el cuadro.",
                },
                {
                    question: "¿Aprovecháis el cableado existente?",
                    answer: "Si el cableado está en buen estado y cumple normativa, sí. Si está deteriorado o infradimensionado, te recomendaremos sustituirlo en los circuitos críticos.",
                },
                {
                    question: "¿Emitís boletín tras cambiar el cuadro?",
                    answer: "Sí. Al ser instaladores autorizados, podemos certificar la instalación una vez actualizada.",
                },
            ],
        },
        related: [
            {
                slug: "averias-electricas-sevilla",
                description:
                    "Reparación de fallos relacionados con cuadros antiguos o mal protegidos.",
            },
            {
                slug: "boletines-electricos-sevilla",
                description:
                    "CIE para tu cuadro nuevo y aumento de potencia con la compañía.",
            },
            {
                slug: "instalaciones-electricas-sevilla",
                description:
                    "Renovación completa de la instalación cuando el cuadro no es lo único obsoleto.",
            },
        ],
        cta: {
            title: "¿Tu cuadro tiene años o ya se queda corto?",
            text: "Pide una visita sin compromiso. Te explicamos qué cambiar, qué dejar y cuánto cuesta modernizarlo.",
        },
    },
    {
        slug: "iluminacion-led-sevilla",
        name: "Iluminación LED",
        seo: {
            description:
                "Instalación de iluminación LED en Sevilla para viviendas, negocios y comunidades. Sustitución LED, proyectos decorativos y eficiencia energética.",
        },
        hero: {
            h1: "Iluminación LED en Sevilla",
            subtitle:
                "Proyectos de iluminación LED para viviendas, negocios y comunidades. Sustitución de luminarias, iluminación decorativa y ahorro energético garantizado.",
            bgImage: "/assets/worksSection/iluminacion.webp",
        },
        intro: {
            title: "La luz adecuada cambia los espacios",
            paragraphs: [
                "La tecnología LED ha cambiado por completo cómo iluminamos viviendas y negocios. Consume hasta un <b>80% menos</b> que las luminarias tradicionales, dura años sin mantenimiento y permite jugar con tonos, intensidades y diseño como nunca antes.",
                "En <b>Instalaciones Eléctricas Jesús Gómez</b> diseñamos e instalamos proyectos de <b>iluminación LED en Sevilla</b>, desde la sustitución sencilla de luminarias hasta proyectos integrales para tiendas, oficinas, restaurantes y comunidades.",
                "Nos preocupamos por algo más que el ahorro: estudiamos temperatura de color, ángulos de apertura y puntos de luz para que el resultado sea acogedor, funcional y eficiente.",
            ],
            image: "/assets/worksSection/iluminacion.webp",
            imageAlt: "Proyecto de iluminación LED en Sevilla",
        },
        includes: {
            title: "Tipos de trabajos LED que realizamos",
            items: [
                {
                    title: "Sustitución a tecnología LED",
                    description:
                        "Cambio de halógenos, fluorescentes y bombillas tradicionales por LED equivalente o superior.",
                },
                {
                    title: "Iluminación decorativa",
                    description:
                        "Tiras LED, focos empotrables, perfiles indirectos y luminarias de diseño para crear ambiente.",
                },
                {
                    title: "Proyectos integrales de iluminación",
                    description:
                        "Estudio luminotécnico, plano de puntos, elección de luminarias y montaje completo.",
                },
                {
                    title: "Negocios y locales comerciales",
                    description:
                        "Iluminación adecuada para escaparates, lineales, salas de espera, restauración y oficinas.",
                },
                {
                    title: "Comunidades de vecinos",
                    description:
                        "Sustitución de alumbrado en escaleras, garajes y patios con detectores de presencia y temporizadores.",
                },
                {
                    title: "Eficiencia energética",
                    description:
                        "Cálculos de ahorro, regulación con dimmer, sensores y sistemas de control para reducir consumo.",
                },
            ],
        },
        problems: {
            title: "Situaciones en las que entramos a iluminar",
            items: [
                {
                    title: "Tu factura de luz se dispara por iluminación",
                    description:
                        "En comunidades, tiendas y oficinas con luz encendida muchas horas, el cambio a LED se amortiza rápido.",
                },
                {
                    title: "Las bombillas se funden constantemente",
                    description:
                        "Suele ser síntoma de luminarias antiguas mal ventiladas o cableado deteriorado.",
                },
                {
                    title: "El local no luce bien",
                    description:
                        "Iluminación mal repartida, sombras o tonos fríos arruinan productos, comidas o espacios. Lo rediseñamos.",
                },
                {
                    title: "La luz parpadea o tiene zumbido",
                    description:
                        "A menudo son drivers de mala calidad o regulación incompatible. Sustituimos por componentes adecuados.",
                },
                {
                    title: "Quieres más confort en casa",
                    description:
                        "Tiras LED indirectas, luz cálida regulable y ambientes diferenciados marcan la diferencia.",
                },
                {
                    title: "Las escaleras de la comunidad gastan demasiado",
                    description:
                        "Sustituimos por LED con detector de presencia y temporizador adaptado a la normativa.",
                },
            ],
        },
        benefits: {
            title: "Ventajas del LED bien instalado",
            items: [
                {
                    icon: "💡",
                    title: "Hasta 80% menos consumo",
                    description:
                        "La tecnología LED reduce drásticamente la factura frente a halógeno y fluorescente.",
                },
                {
                    icon: "🕒",
                    title: "Larga vida útil",
                    description:
                        "Hasta 30.000-50.000 horas según luminaria. Olvídate de cambiar bombillas.",
                },
                {
                    icon: "🌡️",
                    title: "Tonalidades a tu medida",
                    description:
                        "Luz cálida, neutra o fría según el uso y el ambiente que quieras crear.",
                },
                {
                    icon: "🎛️",
                    title: "Regulación y escenas",
                    description:
                        "Compatible con regulación, temporizadores, sensores y sistemas de domótica.",
                },
                {
                    icon: "🌍",
                    title: "Menos huella de carbono",
                    description:
                        "Reduces consumo y emisiones, alineado con la eficiencia energética del edificio.",
                },
                {
                    icon: "🛠️",
                    title: "Instalación profesional",
                    description:
                        "Drivers de calidad, dimensionado correcto y cableado adecuado para evitar fallos prematuros.",
                },
            ],
        },
        process: {
            title: "Cómo trabajamos un proyecto de iluminación",
            steps: [
                {
                    title: "Estudio del espacio",
                    description:
                        "Visitamos el inmueble, medimos zonas y entendemos qué quieres conseguir con la luz.",
                },
                {
                    title: "Propuesta de iluminación",
                    description:
                        "Te enseñamos opciones de luminarias, tonos y distribución con su correspondiente cálculo de ahorro.",
                },
                {
                    title: "Presupuesto cerrado",
                    description:
                        "Detalle de luminarias, mano de obra y posibles trabajos eléctricos asociados.",
                },
                {
                    title: "Montaje y conexionado",
                    description:
                        "Instalamos las luminarias, drivers y controles, dejando todo probado y ajustado.",
                },
                {
                    title: "Ajuste final",
                    description:
                        "Regulamos intensidades, configuramos escenas si las hay y te explicamos el uso.",
                },
            ],
        },
        faq: {
            title: "Preguntas frecuentes sobre iluminación LED",
            items: [
                {
                    question: "¿Cuánto se ahorra cambiando a LED?",
                    answer: "Depende del tipo de luminaria sustituida y de las horas de uso, pero el ahorro típico está entre el 60% y el 85% del consumo en iluminación. En negocios y comunidades, la inversión suele recuperarse en 1-2 años.",
                },
                {
                    question: "¿Puedo regular cualquier LED?",
                    answer: "No todos los LED son regulables. Hay que combinar luminaria, driver y regulador compatibles. Nosotros nos encargamos de elegir el conjunto correcto.",
                },
                {
                    question: "¿Qué temperatura de color recomendáis?",
                    answer: "Para salones y dormitorios, luz cálida (2700-3000K). Para cocinas y baños, neutra (3500-4000K). Para oficinas y comercios, neutra o ligeramente fría. Lo ajustamos a cada espacio.",
                },
                {
                    question: "¿Trabajáis en comunidades de vecinos?",
                    answer: "Sí. Cambiamos alumbrado de escalera, garaje y patio por LED con detectores de presencia. Reducimos consumo y mejoramos la luz.",
                },
                {
                    question: "¿La luz LED hace daño a la vista?",
                    answer: "Una luz LED de calidad, sin parpadeo y con temperatura adecuada es perfectamente confortable. Los problemas suelen venir de luminarias muy baratas con driver deficiente.",
                },
                {
                    question: "¿Puedo añadir tiras LED en mi casa actual?",
                    answer: "Sí. Las tiras LED se integran en falsos techos, perfiles, muebles o cabeceros, con alimentación discreta y, si quieres, control desde el móvil.",
                },
            ],
        },
        related: [
            {
                slug: "instalaciones-electricas-sevilla",
                description:
                    "Cuando la iluminación forma parte de una reforma o instalación completa.",
            },
            {
                slug: "instalaciones-electricas-negocios-sevilla",
                description:
                    "Iluminación comercial diseñada para vender y trabajar mejor.",
            },
            {
                slug: "mantenimiento-electrico-sevilla",
                description:
                    "Mantenimiento periódico de luminarias y alumbrado en comunidades y empresas.",
            },
        ],
        cta: {
            title: "¿Quieres ahorrar en iluminación y mejorar tu espacio?",
            text: "Te visitamos, calculamos cuánto puedes ahorrar y te proponemos un proyecto LED a tu medida.",
        },
    },
    {
        slug: "instalaciones-electricas-sevilla",
        name: "Instalaciones eléctricas",
        seo: {
            description:
                "Instalaciones eléctricas completas en Sevilla para viviendas, locales y oficinas. Canalizaciones, derivación individual, redes UTP y mecanismos. Boletín incluido.",
        },
        hero: {
            h1: "Instalaciones Eléctricas en Sevilla",
            subtitle:
                "Diseño y ejecución de instalaciones eléctricas completas en viviendas, locales y oficinas. Reformas integrales y obra nueva con boletín eléctrico incluido.",
            bgImage: "/assets/worksSection/instalaciones-electricas.webp",
        },
        intro: {
            title: "Instalaciones eléctricas hechas para durar",
            paragraphs: [
                "Una instalación eléctrica bien hecha no se ve, pero se nota cada día: nada falla, todo cumple la normativa y la vivienda o el local funcionan sin sustos.",
                "En <b>Instalaciones Eléctricas Jesús Gómez</b> realizamos <b>instalaciones eléctricas integrales</b> en Sevilla, tanto en obra nueva como en reforma. Cuidamos el diseño, los materiales y la ejecución, porque sabemos que de aquí depende la seguridad y el confort durante décadas.",
                "Trabajamos para particulares, promotores y empresas, adaptándonos al uso real del espacio y previendo necesidades futuras como climatización, recarga de vehículo eléctrico o domótica.",
            ],
            image: "/assets/worksSection/instalaciones-electricas.webp",
            imageAlt: "Instalación eléctrica completa de vivienda en Sevilla",
        },
        includes: {
            title: "Qué incluye una instalación completa",
            items: [
                {
                    title: "Viviendas, locales y oficinas",
                    description:
                        "Instalaciones completas desde el inicio o reformas integrales adaptadas al uso del inmueble.",
                },
                {
                    title: "Canalizaciones empotradas o vistas",
                    description:
                        "Tubo corrugado en obra y bandejas o canaletas cuando se requiere instalación de superficie en local comercial.",
                },
                {
                    title: "Derivación individual",
                    description:
                        "Tendido desde la centralización de contadores hasta el cuadro de tu vivienda o local, cumpliendo sección y caída de tensión.",
                },
                {
                    title: "Redes de datos UTP",
                    description:
                        "Cableado estructurado Cat6/Cat6A para internet por cable, teletrabajo, IPTV y puntos de acceso WiFi.",
                },
                {
                    title: "Tomas eléctricas y mecanismos",
                    description:
                        "Reparto inteligente de enchufes, interruptores e iluminación según uso real de cada estancia.",
                },
                {
                    title: "Ventilación y extractores",
                    description:
                        "Instalación eléctrica de extractores de baño, cocina y sistemas de ventilación controlados por temporizador o sensor.",
                },
            ],
        },
        problems: {
            title: "Cuándo necesitas una instalación nueva",
            items: [
                {
                    title: "Estás reformando la vivienda",
                    description:
                        "Si vas a tocar suelos, paredes o cocina, es el momento de renovar la instalación: hacerlo después cuesta el doble.",
                },
                {
                    title: "Has comprado un piso antiguo",
                    description:
                        "Las viviendas anteriores a los 80 suelen tener cableado deficiente y pocos circuitos para el uso actual.",
                },
                {
                    title: "Vas a abrir un local",
                    description:
                        "Cada actividad exige una configuración eléctrica concreta: iluminación, tomas de fuerza, ventilación, datos.",
                },
                {
                    title: "Faltan enchufes en toda la casa",
                    description:
                        "Si dependes de regletas y alargadores, la instalación no está dimensionada para tu vida actual.",
                },
                {
                    title: "Quieres preparar la casa para domótica o coche eléctrico",
                    description:
                        "Dejamos previsiones de cableado, tubos pasamuros y espacio en cuadro para futuras ampliaciones.",
                },
                {
                    title: "Tu instalación no tiene boletín",
                    description:
                        "Aprovechamos la reforma para emitir el certificado CIE y dejar la vivienda legalizada.",
                },
            ],
        },
        benefits: {
            title: "Lo que ganas con una instalación bien diseñada",
            items: [
                {
                    icon: "🛡️",
                    title: "Seguridad real",
                    description:
                        "Materiales homologados, secciones correctas y protecciones acordes al uso de cada circuito.",
                },
                {
                    icon: "🧠",
                    title: "Pensada para tu día a día",
                    description:
                        "Distribuimos enchufes e interruptores donde realmente los necesitas, no donde caen por defecto.",
                },
                {
                    icon: "🔮",
                    title: "Preparada para el futuro",
                    description:
                        "Previsiones para climatización, datos, wallbox y domótica para que no haya que volver a romper paredes.",
                },
                {
                    icon: "📋",
                    title: "Legalizada de origen",
                    description:
                        "Emitimos boletín eléctrico y dejamos toda la documentación en orden.",
                },
                {
                    icon: "🤝",
                    title: "Coordinación con otros gremios",
                    description:
                        "Nos encajamos con albañiles, fontaneros, pintores y carpinteros para que la obra fluya.",
                },
                {
                    icon: "✨",
                    title: "Acabado limpio",
                    description:
                        "Empotrados ordenados, cajas alineadas y mecanismos a plomo. Detalles que se ven y se notan.",
                },
            ],
        },
        process: {
            title: "Cómo trabajamos tu instalación eléctrica",
            steps: [
                {
                    title: "Visita técnica y toma de medidas",
                    description:
                        "Estudiamos el espacio, escuchamos lo que necesitas y revisamos planos si es obra nueva.",
                },
                {
                    title: "Proyecto y propuesta",
                    description:
                        "Te entregamos el diseño de circuitos, número de puntos, tipo de mecanismos y presupuesto cerrado.",
                },
                {
                    title: "Replanteo en obra",
                    description:
                        "Marcamos sobre paredes la ubicación de cajas, cuadro y luminarias para que lo valides antes de cortar.",
                },
                {
                    title: "Ejecución de la instalación",
                    description:
                        "Canalizaciones, cableado, cuadro, mecanismos e iluminación según el calendario de obra.",
                },
                {
                    title: "Pruebas, boletín y entrega",
                    description:
                        "Medimos aislamiento, tierra y diferencial, emitimos CIE y entregamos la documentación.",
                },
            ],
        },
        faq: {
            title: "Preguntas frecuentes sobre instalaciones eléctricas",
            items: [
                {
                    question:
                        "¿Cuánto tarda la instalación eléctrica de un piso?",
                    answer: "Una instalación eléctrica completa en una vivienda media suele estar entre 1 y 3 semanas, dependiendo del tamaño, del estado actual y de si se coordina con otros gremios.",
                },
                {
                    question:
                        "¿Puedo cambiar solo una parte de la instalación?",
                    answer: "Sí. Podemos renovar cocina, baños o el cuadro general por fases, aunque siempre te avisamos si lo recomendable es ir más allá por seguridad o normativa.",
                },
                {
                    question: "¿Qué tipo de cable y mecanismos usáis?",
                    answer: "Cable libre de halógenos de marcas homologadas y mecanismos de gama media o alta según presupuesto (Simon, Niessen, BJC, Jung). Te enseñamos opciones para elegir.",
                },
                {
                    question: "¿Vais a dejar la casa muy sucia?",
                    answer: "Trabajamos con la mayor limpieza posible y recogemos el material al final de cada jornada. En reformas integrales suele coordinarse con albañilería para optimizar.",
                },
                {
                    question:
                        "¿Instaláis también el cableado de internet (UTP)?",
                    answer: "Sí. Dejamos red estructurada en las estancias clave para tener internet por cable estable, ideal para teletrabajo y streaming.",
                },
                {
                    question: "¿Emitís el boletín al terminar?",
                    answer: "Sí, como instaladores autorizados emitimos el certificado eléctrico (CIE) al finalizar la instalación.",
                },
            ],
        },
        related: [
            {
                slug: "iluminacion-led-sevilla",
                description:
                    "Proyecto completo de iluminación eficiente para tu vivienda o local.",
            },
            {
                slug: "cuadros-electricos-sevilla",
                description:
                    "El núcleo de cualquier instalación: dimensionado, ordenado y conforme a REBT.",
            },
            {
                slug: "boletines-electricos-sevilla",
                description:
                    "CIE para dar de alta el suministro tras la instalación.",
            },
        ],
        cta: {
            title: "¿Reforma o vivienda nueva en Sevilla?",
            text: "Visitamos el inmueble, escuchamos lo que necesitas y te entregamos un presupuesto cerrado sin compromiso.",
        },
    },
    {
        slug: "instalaciones-electricas-negocios-sevilla",
        name: "Instalaciones para negocios",
        seo: {
            description:
                "Instalaciones eléctricas para negocios en Sevilla: locales comerciales, oficinas, naves industriales y trifásicas. Iluminación comercial y eficiencia energética.",
        },
        hero: {
            h1: "Instalaciones Eléctricas para Negocios en Sevilla",
            subtitle:
                "Instalaciones eléctricas completas para locales comerciales, oficinas y naves industriales. Cuadros trifásicos, iluminación comercial y eficiencia energética desde el primer día.",
            bgImage: "/assets/ourJobs/trabajo-luz.webp",
        },
        intro: {
            title: "La instalación eléctrica de tu negocio, hecha por profesionales",
            paragraphs: [
                "Un local comercial no funciona como una vivienda. Las horas de uso son distintas, los consumos son mayores y un fallo eléctrico durante el horario de apertura significa <b>pérdidas reales</b>. Por eso una instalación de negocio debe diseñarse con criterios técnicos y comerciales a la vez.",
                "En <b>Instalaciones Eléctricas Jesús Gómez</b> realizamos <b>instalaciones eléctricas para negocios en Sevilla</b>: locales comerciales, oficinas, restaurantes, naves industriales y centros logísticos. Dimensionamos cuadros, repartimos cargas, diseñamos iluminación comercial y dejamos todo legalizado.",
                "Trabajamos coordinados con tu calendario de apertura. Si ya estás en marcha, planificamos las intervenciones para que el negocio no pare.",
            ],
            image: "/assets/ourJobs/trabajo-luz.webp",
            imageAlt: "Instalación eléctrica en local comercial de Sevilla",
        },
        includes: {
            title: "Qué hacemos para tu negocio",
            items: [
                {
                    title: "Locales comerciales",
                    description:
                        "Distribución de tomas, alumbrado de venta, iluminación de escaparate, sistemas de cobro y caja registradora.",
                },
                {
                    title: "Oficinas",
                    description:
                        "Cableado eléctrico y de datos (UTP) para puestos de trabajo, salas de reuniones y zonas comunes.",
                },
                {
                    title: "Naves industriales",
                    description:
                        "Instalaciones trifásicas para maquinaria, líneas de fuerza, iluminación industrial y mando.",
                },
                {
                    title: "Instalaciones trifásicas",
                    description:
                        "Cuadros trifásicos correctamente equilibrados para potencias elevadas y maquinaria específica.",
                },
                {
                    title: "Iluminación comercial",
                    description:
                        "Proyectos lumínicos para vender más: escaparate, lineales, zonas calientes y ambiente del local.",
                },
                {
                    title: "Eficiencia energética",
                    description:
                        "LED, sensores, control horario y separación de circuitos para reducir factura sin afectar al servicio.",
                },
            ],
        },
        problems: {
            title: "Lo que nos cuentan los clientes de negocio",
            items: [
                {
                    title: "El local que has alquilado no cumple para tu actividad",
                    description:
                        "Cambio de uso de oficina a restaurante, de almacén a tienda... cada actividad exige adaptaciones eléctricas concretas.",
                },
                {
                    title: "Saltan los diferenciales en plena hora punta",
                    description:
                        "Indica circuitos infradimensionados o mal repartidos. Lo solucionamos rediseñando el cuadro.",
                },
                {
                    title: "Necesitas trifásica para nueva maquinaria",
                    description:
                        "Hornos, vitrinas, compresores o cámaras pueden requerir trifásica. Gestionamos el cambio con la distribuidora.",
                },
                {
                    title: "Las facturas de luz no paran de subir",
                    description:
                        "Iluminación obsoleta, climatización mal gestionada y motores sin protección consumen más de la cuenta.",
                },
                {
                    title: "Te falta cableado de datos",
                    description:
                        "El WiFi no llega a todas partes y necesitas red estructurada UTP para puntos de cobro, cámaras o teletrabajo.",
                },
                {
                    title: "No quieres cerrar el negocio durante la obra",
                    description:
                        "Planificamos por fases o en horario nocturno para minimizar el impacto en tu actividad.",
                },
            ],
        },
        benefits: {
            title: "Por qué elegirnos para tu negocio",
            items: [
                {
                    icon: "🏪",
                    title: "Visión de negocio",
                    description:
                        "Diseñamos pensando en cómo trabajas, no solo en cómo conectar cables.",
                },
                {
                    icon: "⚙️",
                    title: "Experiencia en trifásica",
                    description:
                        "Reparto de cargas, equilibrado de fases y protecciones específicas para maquinaria.",
                },
                {
                    icon: "📊",
                    title: "Eficiencia energética",
                    description:
                        "Te enseñamos dónde se va el dinero y cómo reducir consumo sin sacrificar operativa.",
                },
                {
                    icon: "📅",
                    title: "Trabajamos con tu calendario",
                    description:
                        "Intervenciones por fases, en horario nocturno o fuera de horario comercial cuando es necesario.",
                },
                {
                    icon: "📋",
                    title: "Legalización completa",
                    description:
                        "Boletines, certificados, memorias técnicas y soporte para inspecciones OCA.",
                },
                {
                    icon: "🤝",
                    title: "Acompañamiento posterior",
                    description:
                        "Mantenimiento eléctrico continuado tras la instalación para que tu negocio no pare.",
                },
            ],
        },
        process: {
            title: "Cómo lo planteamos en tu negocio",
            steps: [
                {
                    title: "Visita y estudio del local",
                    description:
                        "Visitamos el local, vemos la actividad, los equipos y las horas de uso. Entendemos tu negocio antes de proponer nada.",
                },
                {
                    title: "Diseño técnico",
                    description:
                        "Planteamos cuadro, circuitos, iluminación, tomas, datos y previsiones futuras para ampliaciones.",
                },
                {
                    title: "Presupuesto detallado",
                    description:
                        "Te entregamos memoria con materiales, mano de obra y plazos. Sin letra pequeña.",
                },
                {
                    title: "Ejecución coordinada",
                    description:
                        "Trabajamos con tu calendario y, si hace falta, con otros gremios (climatización, albañilería, rotulistas).",
                },
                {
                    title: "Pruebas, certificación y entrega",
                    description:
                        "Comprobaciones finales, emisión de boletín y documentación lista para inspección si procede.",
                },
            ],
        },
        faq: {
            title: "Preguntas frecuentes para negocios",
            items: [
                {
                    question:
                        "¿Puedo seguir abierto durante la obra eléctrica?",
                    answer: "En muchos casos sí. Planificamos por zonas, trabajamos fuera de horario comercial o en jornadas concretas para mantener el negocio operativo el máximo tiempo posible.",
                },
                {
                    question:
                        "¿Cuánto cuesta una instalación eléctrica para un local?",
                    answer: "Depende del tamaño, de la actividad, de si hay que partir de cero o adaptar la existente, y de si necesita trifásica. Tras la visita técnica te damos un presupuesto cerrado y detallado.",
                },
                {
                    question:
                        "¿Tramitáis el cambio a trifásica con la compañía?",
                    answer: "Sí. Preparamos la solicitud a la distribuidora, los certificados necesarios y la adaptación del cuadro.",
                },
                {
                    question: "¿Qué pasa con la inspección OCA del local?",
                    answer: "Para locales de pública concurrencia y ciertos negocios, la OCA es obligatoria. Dejamos la instalación lista para superarla y preparamos la documentación.",
                },
                {
                    question: "¿Hacéis también iluminación comercial?",
                    answer: "Sí. Diseñamos la iluminación pensando en vender más, no solo en alumbrar. Escaparate, lineales y zonas calientes con criterio profesional.",
                },
                {
                    question: "¿Ofrecéis mantenimiento posterior?",
                    answer: "Sí. Podemos firmar contrato de mantenimiento tras la instalación para revisiones periódicas y atención prioritaria ante incidencias.",
                },
            ],
        },
        related: [
            {
                slug: "iluminacion-led-sevilla",
                description:
                    "Iluminación comercial profesional que ahorra y vende.",
            },
            {
                slug: "mantenimiento-electrico-sevilla",
                description:
                    "Plan de mantenimiento para que tu negocio no se pare por una avería.",
            },
            {
                slug: "cuadros-electricos-sevilla",
                description:
                    "Cuadros trifásicos y monofásicos para locales y naves.",
            },
        ],
        cta: {
            title: "¿Vas a abrir o reformar un local en Sevilla?",
            text: "Visitamos el local sin compromiso, escuchamos tu actividad y te entregamos un proyecto eléctrico claro y bien presupuestado.",
        },
    },
    {
        slug: "mantenimiento-electrico-sevilla",
        name: "Mantenimiento eléctrico",
        seo: {
            description:
                "Mantenimiento eléctrico en Sevilla para comunidades, empresas y oficinas. Revisiones preventivas, cumplimiento de normativa y respuesta ante incidencias.",
        },
        hero: {
            h1: "Mantenimiento Eléctrico en Sevilla",
            subtitle:
                "Servicio de mantenimiento eléctrico preventivo y correctivo para comunidades, empresas y oficinas. Evitamos averías antes de que ocurran.",
            bgImage: "/assets/worksSection/mantenimiento.webp",
        },
        intro: {
            title: "Mantener tu instalación es más barato que repararla",
            paragraphs: [
                "La mayoría de averías eléctricas en comunidades y empresas no aparecen de un día para otro: hay señales previas (recalentamientos, disparos, oxidaciones, conexiones flojas) que pasan desapercibidas hasta que es tarde.",
                "En <b>Instalaciones Eléctricas Jesús Gómez</b> ofrecemos servicios de <b>mantenimiento eléctrico en Sevilla</b> para comunidades de propietarios, oficinas, locales comerciales y empresas. Detectamos los problemas antes de que paren tu negocio o dejen el portal sin luz.",
                "Diseñamos planes de mantenimiento adaptados al uso real de la instalación, con visitas periódicas, revisiones documentadas y atención prioritaria ante incidencias.",
            ],
            image: "/assets/worksSection/mantenimiento.webp",
            imageAlt: "Mantenimiento eléctrico preventivo en Sevilla",
        },
        includes: {
            title: "Qué cubre el mantenimiento",
            items: [
                {
                    title: "Mantenimiento preventivo",
                    description:
                        "Revisiones planificadas según uso (mensual, trimestral, semestral) con checklist y registro de cada visita.",
                },
                {
                    title: "Revisión de instalaciones",
                    description:
                        "Inspección de cuadros, protecciones, conexiones, tomas de tierra y secciones de cable.",
                },
                {
                    title: "Comunidades de vecinos",
                    description:
                        "Alumbrado de escalera, garaje, ascensor (parte eléctrica), portero automático, antenas comunes y patios.",
                },
                {
                    title: "Empresas y oficinas",
                    description:
                        "Iluminación de puestos, racks de datos, climatización (parte eléctrica) y SAI cuando aplica.",
                },
                {
                    title: "Cumplimiento de normativa",
                    description:
                        "Verificación periódica conforme al REBT y trazabilidad documental para inspecciones OCA.",
                },
                {
                    title: "Asistencia ante incidencias",
                    description:
                        "Atención prioritaria fuera del calendario de visitas cuando ocurre un fallo imprevisto.",
                },
            ],
        },
        problems: {
            title: "Cuándo conviene tener mantenimiento contratado",
            items: [
                {
                    title: "La comunidad sufre apagones recurrentes",
                    description:
                        "Si los vecinos llaman al presidente porque la escalera se queda sin luz, hay un problema de base que el mantenimiento detecta.",
                },
                {
                    title: "Tu negocio depende totalmente de la electricidad",
                    description:
                        "Comercios, hostelería, oficinas o talleres: una avería sin previsión puede cerrarte el día.",
                },
                {
                    title: "El cuadro está caliente o con polvo",
                    description:
                        "Las conexiones flojas y el polvo acumulado son causas frecuentes de incendios eléctricos en armarios técnicos.",
                },
                {
                    title: "La OCA está al caer",
                    description:
                        "Locales con inspección obligatoria requieren mantenimiento documentado. Preparamos la instalación para que pase a la primera.",
                },
                {
                    title: "Tienes equipos sensibles",
                    description:
                        "Cámaras frigoríficas, servidores, equipos médicos o maquinaria industrial necesitan supervisión continua.",
                },
                {
                    title: "Quieres reducir reparaciones imprevistas",
                    description:
                        "Un buen plan preventivo reduce significativamente el coste anual en averías y paradas.",
                },
            ],
        },
        benefits: {
            title: "Beneficios de un mantenimiento profesional",
            items: [
                {
                    icon: "🛡️",
                    title: "Más seguridad",
                    description:
                        "Reducimos el riesgo de incendio, cortocircuitos y accidentes eléctricos.",
                },
                {
                    icon: "📉",
                    title: "Menos averías imprevistas",
                    description:
                        "Detectamos problemas en su fase temprana, cuando aún son baratos de arreglar.",
                },
                {
                    icon: "📋",
                    title: "Normativa cumplida",
                    description:
                        "Registro documentado conforme al REBT y a las exigencias de inspecciones OCA.",
                },
                {
                    icon: "💼",
                    title: "Tranquilidad para presidentes y gerentes",
                    description:
                        "Sabes a quién llamar, qué se ha revisado y cuándo toca la siguiente visita.",
                },
                {
                    icon: "⏱️",
                    title: "Respuesta prioritaria",
                    description:
                        "Los clientes con contrato tienen preferencia en la agenda ante una incidencia.",
                },
                {
                    icon: "💶",
                    title: "Coste controlado",
                    description:
                        "Cuota cerrada al mes o por visita, sin sorpresas. Más barato que reparar averías una a una.",
                },
            ],
        },
        process: {
            title: "Cómo diseñamos tu plan de mantenimiento",
            steps: [
                {
                    title: "Auditoría inicial",
                    description:
                        "Visitamos la instalación, hacemos un estado de la red eléctrica y detectamos puntos críticos.",
                },
                {
                    title: "Propuesta de plan",
                    description:
                        "Definimos frecuencia de visitas, alcance, tiempo de respuesta y coste mensual o anual.",
                },
                {
                    title: "Contrato y calendario",
                    description:
                        "Firmamos las condiciones y establecemos un calendario de visitas que se respeta.",
                },
                {
                    title: "Ejecución y registro",
                    description:
                        "En cada visita rellenamos checklist, hacemos las correcciones necesarias y dejamos informe.",
                },
                {
                    title: "Revisión anual",
                    description:
                        "Una vez al año analizamos incidencias, ajustamos el plan y proponemos mejoras.",
                },
            ],
        },
        faq: {
            title: "Preguntas frecuentes sobre mantenimiento eléctrico",
            items: [
                {
                    question: "¿Es obligatorio el mantenimiento eléctrico?",
                    answer: "Para instalaciones con inspección periódica OCA (locales de pública concurrencia, ciertas industrias, garajes grandes) sí. En el resto es opcional, pero altamente recomendable para evitar averías y prolongar la vida de la instalación.",
                },
                {
                    question:
                        "¿Cuánto cuesta un contrato de mantenimiento?",
                    answer: "Depende del tamaño de la instalación y de la frecuencia de visitas. Tras la auditoría inicial te entregamos un precio cerrado y la posibilidad de pago mensual o anual.",
                },
                {
                    question: "¿Qué frecuencia de visitas necesito?",
                    answer: "Para una comunidad pequeña puede bastar una visita cada 6 meses. Para una empresa con uso intensivo, mensual o trimestral. Lo ajustamos a tu caso.",
                },
                {
                    question:
                        "Si tengo una avería entre visitas, ¿qué pasa?",
                    answer: "Los clientes con contrato tienen línea directa y prioridad en la agenda. La avería puntual se cobra aparte salvo que esté incluida en el plan contratado.",
                },
                {
                    question: "¿Trabajáis con administradores de fincas?",
                    answer: "Sí. Coordinamos calendarios, informes y juntas directamente con la administración para que el presidente o secretario no tenga que hacer de intermediario.",
                },
                {
                    question: "¿Entregáis informe tras cada visita?",
                    answer: "Sí. Cada intervención queda registrada con fecha, técnico, trabajos realizados y observaciones. Lo recibes por email o impreso, como prefieras.",
                },
            ],
        },
        related: [
            {
                slug: "averias-electricas-sevilla",
                description:
                    "Reparaciones puntuales cuando aparece una avería sin previo aviso.",
            },
            {
                slug: "iluminacion-led-sevilla",
                description:
                    "Renovación del alumbrado de zonas comunes y oficinas con LED eficiente.",
            },
            {
                slug: "instalaciones-electricas-negocios-sevilla",
                description:
                    "Reformas e instalaciones nuevas en locales y empresas.",
            },
        ],
        cta: {
            title: "¿Tu comunidad o empresa necesita un mantenimiento serio?",
            text: "Hacemos una auditoría inicial sin compromiso y te proponemos un plan adaptado a tu uso y presupuesto.",
        },
    },
    {
        slug: "punto-recarga-coche-electrico-sevilla",
        name: "Punto de recarga vehículo eléctrico",
        seo: {
            description:
                "Instalación de cargadores wallbox para coche eléctrico en Sevilla. Viviendas, garajes y negocios. Tramitación, protecciones y legalización incluidas.",
        },
        hero: {
            h1: "Punto de Recarga para Coche Eléctrico en Sevilla",
            subtitle:
                "Instalación profesional de wallbox para vehículos eléctricos en vivienda, plaza de garaje, comunidad y negocio. Llave en mano, con todas las protecciones y legalización.",
            bgImage: "/assets/worksSection/instalaciones-electricas.webp",
        },
        intro: {
            title: "Tu coche eléctrico cargado en casa, sin sobresaltos",
            paragraphs: [
                "Cargar un coche eléctrico en un enchufe normal es lento, ineficiente y, sobre todo, peligroso. Una instalación dedicada con un <b>wallbox bien dimensionado y protegido</b> es la única forma segura de aprovechar de verdad tu vehículo.",
                "En <b>Instalaciones Eléctricas Jesús Gómez</b> instalamos puntos de recarga para coche eléctrico en Sevilla, tanto en viviendas unifamiliares como en plazas de garaje de comunidades, parkings privados y negocios.",
                "Nos ocupamos de todo el proceso: estudio de la instalación, elección del cargador adecuado, tramitación con la comunidad si es necesario, montaje, protecciones específicas y legalización.",
            ],
            image: "/assets/worksSection/instalaciones-electricas.webp",
            imageAlt:
                "Instalación de punto de recarga wallbox para coche eléctrico en Sevilla",
        },
        includes: {
            title: "Qué incluye nuestra instalación",
            items: [
                {
                    title: "Instalación en vivienda unifamiliar",
                    description:
                        "Montaje del wallbox en garaje propio, con derivación desde el cuadro de la vivienda y protecciones específicas.",
                },
                {
                    title: "Instalación en plaza de garaje comunitaria",
                    description:
                        "Acometida desde tu contador hasta tu plaza, cumpliendo la normativa de comunidades y la Ley de Propiedad Horizontal.",
                },
                {
                    title: "Instalación en negocio o parking privado",
                    description:
                        "Puntos de recarga para clientes, empleados o flota empresarial, con sistemas de gestión y control de carga.",
                },
                {
                    title: "Protecciones específicas",
                    description:
                        "Diferencial tipo A o B según wallbox, magnetotérmico dedicado y protector frente a fugas DC.",
                },
                {
                    title: "Asesoramiento sobre el wallbox",
                    description:
                        "Te ayudamos a elegir cargador (potencia, conectividad, gestión dinámica) según tu coche y tu instalación.",
                },
                {
                    title: "Legalización y aumento de potencia",
                    description:
                        "Si hace falta más potencia contratada, tramitamos el aumento y emitimos el certificado correspondiente.",
                },
            ],
        },
        problems: {
            title: "Dudas y situaciones habituales",
            items: [
                {
                    title: "Vives en piso y no sabes cómo instalar el cargador",
                    description:
                        "Existe procedimiento legal para instalarlo en tu plaza notificándolo a la comunidad. Lo gestionamos por ti.",
                },
                {
                    title: "Tu cuadro actual no tiene espacio",
                    description:
                        "Adaptamos o ampliamos el cuadro para alojar las nuevas protecciones del punto de recarga.",
                },
                {
                    title: "No estás seguro de la potencia que necesitas",
                    description:
                        "Te asesoramos en función de tu coche, tus hábitos y la potencia contratada para evitar cortes y disparos.",
                },
                {
                    title: "Te preocupa la seguridad eléctrica del cargador",
                    description:
                        "Instalamos protecciones obligatorias por REBT y comprobamos toma de tierra antes de poner el wallbox en servicio.",
                },
                {
                    title: "Tu negocio quiere ofrecer recarga a clientes",
                    description:
                        "Diseñamos la instalación pensando en escalabilidad, gestión y, si procede, integración con sistemas de pago.",
                },
                {
                    title: "Quieres aprovechar las ayudas públicas",
                    description:
                        "Te orientamos sobre la documentación técnica necesaria para subvenciones como Moves III.",
                },
            ],
        },
        benefits: {
            title: "Por qué instalarlo con un profesional",
            items: [
                {
                    icon: "🔌",
                    title: "Carga rápida y segura",
                    description:
                        "Tu coche cargado en horas en lugar de toda la noche, sin riesgo de recalentamiento de enchufes.",
                },
                {
                    icon: "💶",
                    title: "Ahorro frente a redes públicas",
                    description:
                        "Recargar en casa con tarifa nocturna es notablemente más barato que en cargadores públicos.",
                },
                {
                    icon: "📜",
                    title: "Cumplimiento normativo",
                    description:
                        "Instalación conforme a ITC-BT-52 y resto del REBT, con boletín emitido.",
                },
                {
                    icon: "🏠",
                    title: "Sin afectar al resto de la instalación",
                    description:
                        "Diseñamos el circuito como independiente y gestionamos cargas si la potencia es limitada.",
                },
                {
                    icon: "🛠️",
                    title: "Instalación llave en mano",
                    description:
                        "Desde el estudio inicial hasta la puesta en marcha y la formación de uso, nos ocupamos de todo.",
                },
                {
                    icon: "🌱",
                    title: "Compatible con autoconsumo",
                    description:
                        "Si tienes o tendrás placas solares, dejamos la instalación preparada para integrarla.",
                },
            ],
        },
        process: {
            title: "Proceso de instalación del wallbox",
            steps: [
                {
                    title: "Estudio técnico previo",
                    description:
                        "Revisamos tu instalación, potencia contratada, distancia desde el cuadro y tipo de vehículo.",
                },
                {
                    title: "Propuesta y presupuesto",
                    description:
                        "Te recomendamos modelo de wallbox, tipo de instalación y te entregamos presupuesto cerrado.",
                },
                {
                    title: "Gestión con comunidad o compañía",
                    description:
                        "Si vives en comunidad, preparamos la notificación. Si necesitas más potencia, lo tramitamos con la distribuidora.",
                },
                {
                    title: "Montaje y protecciones",
                    description:
                        "Tendido del cable, instalación del wallbox y protecciones específicas conforme a ITC-BT-52.",
                },
                {
                    title: "Puesta en marcha y boletín",
                    description:
                        "Probamos la carga real con tu coche, configuramos el wallbox y emitimos el certificado eléctrico.",
                },
            ],
        },
        faq: {
            title: "Preguntas frecuentes sobre puntos de recarga",
            items: [
                {
                    question: "¿Puedo instalar un wallbox si vivo en piso?",
                    answer: "Sí. La Ley de Propiedad Horizontal te permite hacerlo en tu plaza de garaje notificándolo a la comunidad. No necesitas su autorización, solo informar. Nosotros te ayudamos con el procedimiento.",
                },
                {
                    question: "¿Necesito ampliar la potencia contratada?",
                    answer: "Depende de tu instalación actual y del wallbox elegido. En muchos casos, con un sistema de gestión dinámica de carga no es necesario subir potencia.",
                },
                {
                    question:
                        "¿Cuánto tarda en cargarse el coche con un wallbox de 7,4 kW?",
                    answer: "Un coche eléctrico medio se carga del 20% al 80% en unas 4-6 horas. Suficiente para tener el coche listo cada mañana sin tarifas caras.",
                },
                {
                    question:
                        "¿Cuánto cuesta instalar un punto de recarga en Sevilla?",
                    answer: "El precio depende de la distancia desde el cuadro, las protecciones necesarias y el modelo de wallbox. Te lo damos cerrado tras la visita técnica.",
                },
                {
                    question: "¿Puedo solicitar ayudas Moves III?",
                    answer: "Sí. Te entregamos la documentación técnica necesaria para tramitar las ayudas y subvenciones vigentes.",
                },
                {
                    question: "¿Qué marca de wallbox recomendáis?",
                    answer: "Trabajamos con marcas reconocidas y homologadas. Te recomendamos la que mejor se adapte a tu coche, instalación y presupuesto, sin atarte a una marca concreta.",
                },
            ],
        },
        related: [
            {
                slug: "cuadros-electricos-sevilla",
                description:
                    "Adaptación o ampliación del cuadro para alojar las protecciones del wallbox.",
            },
            {
                slug: "boletines-electricos-sevilla",
                description:
                    "Tramitación del aumento de potencia y certificado eléctrico del punto de recarga.",
            },
            {
                slug: "instalaciones-electricas-sevilla",
                description:
                    "Adecuación general de la instalación cuando va asociada al wallbox.",
            },
        ],
        cta: {
            title: "¿Te has comprado un coche eléctrico?",
            text: "Te ayudamos a tener tu wallbox funcionando en pocos días. Estudio sin compromiso y presupuesto claro.",
        },
    },
];
