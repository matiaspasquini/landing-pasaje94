import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light mb-12">POLÍTICA DE PRIVACIDAD</h1>
            
            <div className="space-y-8 text-sm md:text-base leading-relaxed text-gray-800">
                <section>
                    <p className="mb-4">
                        PASAJE 94 S.L. es el Responsable del tratamiento de los datos personales del usuario y le informa de que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril (GDPR), y la Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD), por lo que se le facilita la siguiente información del tratamiento:
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-medium mb-4">¿PARA QUÉ TRATAMOS SUS DATOS PERSONALES?</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Prestación de servicios:</strong> Para gestionar su registro, la contratación de nuestros servicios o productos y la relación comercial o profesional.</li>
                        <li><strong>Remisión de comunicaciones comerciales:</strong> Siempre que exista consentimiento previo o una relación contractual previa.</li>
                        <li><strong>Gestión de curriculum:</strong> En el caso de que nos envíe su CV para procesos de selección.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-medium mb-4">¿POR QUÉ MOTIVO PODEMOS TRATAR SUS DATOS PERSONALES?</h2>
                    <p>El tratamiento está legitimado por el artículo 6 del GDPR de la siguiente forma:</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                        <li>Con el consentimiento del Usuario: remisión de comunicaciones comerciales y el boletín informativo.</li>
                        <li>Por interés legítimo del Responsable: realizar estudios de mercado, análisis estadísticos, etc.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-medium mb-4">¿DURANTE CUÁNTO TIEMPO GUARDAREMOS SUS DATOS PERSONALES?</h2>
                    <p>Se conservarán durante no más tiempo del necesario para mantener el fin del tratamiento o existan prescripciones legales que dictaminen su custodia.</p>
                </section>

                <section>
                    <h2 className="text-xl font-medium mb-4">¿A QUIÉN FACILITAMOS SUS DATOS PERSONALES?</h2>
                    <p>No está prevista ninguna comunicación de datos personales a terceros salvo, si fuese necesario para el desarrollo y ejecución de las finalidades del tratamiento, a nuestros proveedores de servicios relacionados con comunicaciones, con los cuales el Responsable tiene suscritos los contratos de confidencialidad y de encargado de tratamiento exigidos por la normativa vigente de privacidad.</p>
                </section>

                <section>
                    <h2 className="text-xl font-medium mb-4">¿CUÁLES SON SUS DERECHOS?</h2>
                    <p>Los derechos que asisten al Usuario son:</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                        <li>Derecho a retirar el consentimiento en cualquier momento.</li>
                        <li>Derecho de acceso, rectificación, portabilidad y supresión de sus datos, y de limitación u oposición a su tratamiento.</li>
                        <li>Derecho a presentar una reclamación ante la autoridad de control (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-medium mb-4">DATOS DE CONTACTO PARA EJERCER SUS DERECHOS</h2>
                    <p className="mt-2">PASAJE 94 S.L.</p>
                    <p>C/ TRINITARIOS 13, BAJO IZDA. 46003, VALENCIA.</p>
                    <p>E-mail: info@pasaje94.com</p>
                </section>
            </div>
        </div>
    </div>
  )
}

export default PrivacyPolicy
