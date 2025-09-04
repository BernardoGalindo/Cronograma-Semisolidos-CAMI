// --- CONFIGURACIÓN PERSONALIZADA DEL RANGO DE FECHAS ---
const GANTT_CONFIG = {
    // Define aquí exactamente el rango de fechas que quieres mostrar
    startDate: '2025-09-04',  // Fecha de inicio del cronograma
    endDate: '2025-09-19',    // Fecha de fin del cronograma (25 días como confirmamos)
    
    // Función para generar el array de fechas (PROBADA Y FUNCIONANDO)
    generateDateRange: function() {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const dates = [];
        
        // Generar fechas día por día desde el inicio hasta el final (inclusive)
        const currentDate = new Date(start);
        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        console.log(`Array generado: ${dates.length} días desde ${this.startDate} hasta ${this.endDate}`);
        return dates;
    }
};

// --- DATOS DEL CRONOGRAMA AJUSTADOS SEGUN LA IMAGEN ---
let tasks = [
    {
        id: '1.1',
        name: 'Inducción presencial de conductores en Kupi 4',
        start: '2025-09-04',
        end: '2025-09-04',
        dependencies: '', // Removed dependency on 1.1
        custom_class: 'gantt-bar-documentation',
        responsable: 'Conductores',
        recursos: 'Material de inducción'
    },
    {
        id: '1.4',
        name: 'Solicitar a EHS apertura de trabajo tipo I',
        start: '2025-09-04',
        end: '2025-09-04',
        dependencies: '', // Removed dependency on 1.3
        custom_class: 'gantt-bar-documentation',
        responsable: 'Coordinador EHS',
        recursos: 'Sistema de permisos de Trabajo, Documentación EHS, AST'
    },
    {
        id: '2',
        name: 'Fase 2: Evacuación de Sedimentos NE-24',
        start: '2025-09-05',
        end: '2025-09-13',
        dependencies: '', // Removed dependency on 1
        custom_class: 'gantt-bar-evacuation',
        responsable: 'Jefe de Operaciones',
        recursos: 'Obreros, EPP, Plataformas, Vacuums, Brazo Grúa'
    },
    {
        id: '2.1',
        name: 'Solicitud Liberación de Vacuums (Coordinación con EHS)',
        start: '2025-09-04',
        end: '2025-09-05',
        dependencies: '1.4',
        custom_class: 'gantt-bar-documentation',
        responsable: 'Coordinador EHS',
        recursos: 'Personal EHS, Documentación'
    },
    {
        id: '2.2',
        name: 'Apertura Permiso trabajo Tipo I, charla de seguridad y AST',
        start: '2025-09-05',
        end: '2025-09-05',
        dependencies: '2.1',
        custom_class: 'gantt-bar-documentation',
        responsable: 'Supervisor de operaciones',
        recursos: 'AST, EPP, personal operativo'
    },
    {
        id: '2.3',
        name: 'Evacuación Sedimentos Ranfla Industrial (219.08 m³)',
        start: '2025-09-05',
        end: '2025-09-08',
        dependencies: '2.2',
        custom_class: 'gantt-bar-evacuation',
        responsable: 'Supervisor de Operaciones, ejecutor, Conductor de Vacuums',
        recursos: 'Vacuums,EPP, Personal Gpower'
    },
    {
        id: '2.3.1',
        name: 'Solicitud valoración médica (Aptitud Espacio Confinado)',
        start: '2025-09-08',
        end: '2025-09-09',
        dependencies: '2.3',
        custom_class: 'gantt-bar-medical',
        responsable: 'Médico Ocupacional',
        recursos: 'Personal médico, Obreros Gpower'
    },
    {
        id: '2.5',
        name: 'Apertura Permiso de Trabajo Espacio Confinado A, charla y AST',
        start: '2025-09-09',
        end: '2025-09-09',
        dependencies: '2.3.1',
        custom_class: 'gantt-bar-documentation',
        responsable: 'Supervisor EHS',
        recursos: 'Equipos de detección de H2S, AST, EPP'
    },
    {
        id: '2.6',
        name: 'Evacuación API Industrial (127.68 m³)',
        start: '2025-09-09',
        end: '2025-09-12',
        dependencies: '2.5',
        custom_class: 'gantt-bar-evacuation',
        responsable: 'Operador API',
        recursos: 'Unidades Vacuum, Personal Gpower, EPP, Medidor de H2S'
    },
    {
        id: '2.8',
        name: 'Solicitud de liberación de plataformas y camión grúa',
        start: '2025-09-11',
        end: '2025-09-12',
        dependencies: '',
        custom_class: 'gantt-bar-documentation',
        responsable: 'Coordinador EHS',
        recursos: 'Plataformas, Camión grúa, Documentación'
    },
    {
        id: '2.9',
        name: 'Limpieza de Semisólidos Plataforma #2 (58,64 m3)',
        start: '2025-09-13',
        end: '2025-09-13',
        dependencies: '',
        custom_class: 'gantt-bar-documentation',
        responsable: 'Supervisor de Operaciones',
        recursos: 'Plataformas, Camión grúa, AST '
    },
    {
        id: '3',
        name: 'Fase 3:validación Guias / Informes Justificativos',
        start: '2025-09-14',
        end: '2025-09-19',
        dependencies: '2.8',
        custom_class: 'gantt-bar-documentation',
        responsable: 'Supervisor de Operaciones',
        recursos: 'Guias de Remisión Evacuación, Informes Justificativos'
    }
];

// --- INICIALIZACIÓN DEL GANTT ---
var gantt = new Gantt("#gantt", tasks, {
    header_height: 60,
    column_width: 30,
    step: 24,
    view_modes: ['Day'],
    bar_height: 30,
    bar_corner_radius: 0,
    arrow_curve: 5,
    padding: 25,
    view_mode: 'Day',
    date_format: 'YYYY-MM-DD',
    language: 'es',
    // Forzar el rango de fechas personalizado
    date_range: GANTT_CONFIG.generateDateRange(),
    on_click: function(task) {
        // no-op; reservado por si se requiere abrir detalle
    },
    on_date_change: function(task, start, end) {
        // Actualizar fechas
        try {
            task.start = ymd(start);
            task.end = ymd(end);
        } catch (_) {}
        setTimeout(() => {
            adjustBarLabels();
        }, 50);
    },
    on_progress_change: function(task, progress) {
        setTimeout(() => {
            adjustBarLabels();
        }, 50);
    },
    on_view_change: function(mode) {
        setTimeout(() => {
            adjustBarLabels();
        }, 50);
    },
    custom_popup_html: function(task) {
        const start_date = new Date(task._start).toLocaleDateString('es-EC');
        const end_date = new Date(task._end).toLocaleDateString('es-EC');
    const duration = Math.ceil((new Date(task._end) - new Date(task._start)) / (1000 * 60 * 60 * 24)) + 1;
        // Determinar icono basado en el tipo de tarea
        let icon = '';
        let colorClass = '';
        switch(task.custom_class) {
            case 'gantt-bar-documentation':
                icon = '📋';
                colorClass = 'border-blue-400 bg-blue-50';
                break;
            case 'gantt-bar-evacuation':
                icon = '🚛';
                colorClass = 'border-red-400 bg-red-50';
                break;
            case 'gantt-bar-medical':
                icon = '⚕️';
                colorClass = 'border-green-400 bg-green-50';
                break;
            default:
                icon = '📌';
                colorClass = 'border-gray-400 bg-gray-50';
        }
        
        return `
            <div class="popup-wrapper ${colorClass} border-l-4 rounded-md p-4 shadow-lg max-w-sm">
                <div class="title font-bold text-gray-900 mb-2">
                    ${icon} ${task.name}
                </div>
                <div class="details space-y-2 text-sm text-gray-700">
                    <div><strong>Fechas:</strong> ${start_date === end_date ? start_date : `${start_date} - ${end_date}`}</div>
                    <div><strong>Duración:</strong> ${duration} día${duration > 1 ? 's' : ''}</div>
                    <div><strong>Responsable:</strong> ${task.responsable || 'No asignado'}</div>
                    <div><strong>Recursos:</strong> ${task.recursos || 'No especificado'}</div>
                </div>
            </div>
        `;
    }
});

// Forzar las fechas personalizadas después de la inicialización
setTimeout(() => {
    if (gantt && GANTT_CONFIG) {
        gantt.dates = GANTT_CONFIG.generateDateRange();
        gantt.refresh(tasks);
        console.log(`Gantt configurado con ${gantt.dates.length} días personalizados`);
    }
}, 100);

// --- UTILIDADES DE FECHA ---
function ymd(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function sameYMD(a,b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

// Eliminar marcadores del día actual (seguro aunque CSS ya los oculte)
function removeTodayMarkers() {
    try {
        const svg = document.getElementById('gantt');
        if (!svg) return;
        const selectors = [
            '.today-highlight', '.today', '.today-line', '.current-date-line', '.current-date-marker',
            'line[stroke="#ff0000"]', 'line[stroke="red"]', 'line[stroke="#000"][stroke-width="2"]'
        ];
        selectors.forEach(sel => svg.querySelectorAll(sel).forEach(el => el.remove()));
    } catch (_) { /* ignorar */ }
}

// --- INICIALIZACIÓN ---
removeTodayMarkers();

// Aplicar ajustes después de que el Gantt se haya renderizado
setTimeout(() => {
    console.log('Iniciando configuración post-render del Gantt');
    adjustBarLabels();
}, 500);

// --- AJUSTE DE ETIQUETAS DE BARRA PARA EVITAR CORTES ---
function adjustBarLabels(svgRoot = document.getElementById('gantt')) {
    if (!svgRoot) return;
    // Delay to ensure BBox calculations are ready
    setTimeout(() => {
        const wrappers = svgRoot.querySelectorAll('.bar-wrapper');
        let maxLabelRight = 0;
        wrappers.forEach((w, i) => {
            const bar = w.querySelector('.bar');
            const label = w.querySelector('.bar-label');
            if (!bar || !label) return;
            try {
                const b = bar.getBBox();
                const raw = (label.textContent || '').trim();

                // All labels use a 50px offset to the right of the bar
                const x = b.x + b.width + 50;
                const y = b.y + b.height / 2 + 4;
                label.setAttribute('x', x.toString());
                label.setAttribute('y', y.toString());
                label.setAttribute('text-anchor', 'start');
                label.classList.add('outside');
                label.setAttribute('fill', '#111827');

                // Asegurar que no existan tspans que oculten parte del texto
                if (label.querySelector('tspan')) {
                    const plain = label.textContent || raw;
                    label.textContent = plain; // simplificar a una sola línea
                }

                // Calcular el extremo derecho del label
                let labelWidth = 0;
                try {
                    labelWidth = label.getBBox().width;
                } catch (_) {
                    // fallback: estimate width
                    labelWidth = (label.textContent.length || 10) * 7;
                }
                const labelRight = x + labelWidth;
                if (labelRight > maxLabelRight) maxLabelRight = labelRight;
            } catch (_) {
                // Ignore errors in BBox calculations
            }
        });
        // Si alguna etiqueta se sale del SVG, expandir el ancho del SVG
        if (maxLabelRight > svgRoot.clientWidth) {
            svgRoot.setAttribute('width', (maxLabelRight + 40).toString());
            svgRoot.style.minWidth = (maxLabelRight + 40) + 'px';
            // Asegurar scroll horizontal en el contenedor
            const ganttContainer = document.querySelector('.gantt-container');
            if (ganttContainer) {
                ganttContainer.style.overflowX = 'auto';
            }
        }
    }, 150);
}

// Ajustar etiquetas tras el render inicial
adjustBarLabels();

// --- FUNCIÓN PARA MOSTRAR/OCULTAR TABLA DE RECURSOS ---
function toggleResourcesTable() {
    const checkbox = document.getElementById('toggleResponsables');
    const table = document.getElementById('resources-table');
    
    if (checkbox.checked) {
        table.classList.remove('hidden');
        populateResourcesTable();
    } else {
        table.classList.add('hidden');
    }
}

// --- FUNCIÓN PARA LLENAR LA TABLA DE RECURSOS ---
function populateResourcesTable() {
    const tableBody = document.getElementById('resources-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        
        // Formatear fechas
        const startDate = new Date(task.start).toLocaleDateString('es-EC', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const endDate = new Date(task.end).toLocaleDateString('es-EC', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric'
        });
        
        // Determinar color de fondo basado en el tipo de tarea
        let bgColorClass = '';
        switch(task.custom_class) {
            case 'gantt-bar-documentation':
                bgColorClass = 'bg-blue-50 border-l-4 border-blue-400';
                break;
            case 'gantt-bar-evacuation':
                bgColorClass = 'bg-red-50 border-l-4 border-red-400';
                break;
            case 'gantt-bar-medical':
                bgColorClass = 'bg-green-50 border-l-4 border-green-400';
                break;
            default:
                bgColorClass = 'bg-gray-50 border-l-4 border-gray-400';
        }
        
        row.className = `hover:bg-gray-50 ${bgColorClass}`;
        
        row.innerHTML = `
            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${task.id}</td>
            <td class="px-4 py-3 text-sm text-gray-900">
                <div class="max-w-xs truncate" title="${task.name}">
                    ${task.name}
                </div>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700">
                <div class="font-medium">${task.responsable || 'No asignado'}</div>
            </td>
            <td class="px-4 py-3 text-sm text-gray-600">
                <div class="max-w-sm">${task.recursos || 'No especificado'}</div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                ${startDate === endDate ? startDate : `${startDate} - ${endDate}`}
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// --- FUNCIÓN MEJORADA PARA RECORTAR IMAGEN EN EXPORTACIÓN ---
async function exportGanttAsPDFCropped() {
    const exportBtn = document.getElementById('export-pdf-btn');
    if (!exportBtn) return;

    // Comprobación de librerías
    if (!(window.jspdf && window.jspdf.jsPDF)) {
        alert('La librería jsPDF no se cargó. Verifica tu conexión a Internet o vuelve a abrir el archivo.');
        return;
    }
    if (typeof html2canvas !== 'function') {
        alert('La librería html2canvas no se cargó. Verifica tu conexión a Internet o vuelve a abrir el archivo.');
        return;
    }

    // Intentar abrir una ventana de vista previa
    let previewWin = null;
    try {
        previewWin = window.open('', '_blank');
        if (previewWin && previewWin.document) {
            previewWin.document.write('<html><head><title>Generando PDF…</title></head><body style="font-family:Arial, sans-serif; color:#111; padding:16px"><p>Generando PDF…</p></body></html>');
        }
    } catch (_) { /* ignorar */ }

    // Estado de carga
    const originalBtnContent = exportBtn.innerHTML;
    exportBtn.disabled = true;
    exportBtn.innerHTML = `
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Exportando...
    `;

    const { jsPDF } = window.jspdf;
    const ganttElement = document.getElementById("gantt-export-container");

    if (!ganttElement) {
        alert("No se pudo encontrar el elemento del cronograma para exportar.");
        exportBtn.disabled = false;
        exportBtn.innerHTML = originalBtnContent;
        return;
    }

    try {
        const canvas = await html2canvas(ganttElement, {
            scale: 3, // alta resolución
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            removeContainer: true,
            onclone: (clonedDoc) => {
                // Ocultar elementos no necesarios en la exportación
                const elementsToHide = [
                    '#export-pdf-btn',
                    '#toggleResponsables',
                    'label[for="toggleResponsables"]',
                    '.controls'
                ];
                
                elementsToHide.forEach(selector => {
                    const element = clonedDoc.querySelector(selector);
                    if (element) element.style.display = 'none';
                });

                // Ocultar tabla de recursos si está visible (para exportar solo el Gantt)
                const resourcesTable = clonedDoc.getElementById('resources-table');
                if (resourcesTable) resourcesTable.style.display = 'none';

                clonedDoc.body.classList.add('preparing-for-export');

                // Asegurar que el gantt se muestre completo
                const gw = clonedDoc.querySelector('.gantt-wrapper');
                if (gw) {
                    gw.style.overflow = 'visible';
                    gw.style.maxWidth = 'none';
                    gw.style.width = 'fit-content';
                }
                
                const gc = clonedDoc.querySelector('.gantt-container');
                if (gc) {
                    gc.style.overflow = 'visible';
                    gc.style.maxWidth = 'none';
                    gc.style.width = 'fit-content';
                }
                
                const main = clonedDoc.getElementById('gantt-export-container');
                if (main) {
                    main.style.maxWidth = 'none';
                    main.style.width = 'fit-content';
                    main.style.display = 'inline-block';
                }

                // RECORTE AUTOMÁTICO: Ocultar columnas de fechas que no están en nuestro rango
                const ganttSvg = clonedDoc.getElementById('gantt');
                if (ganttSvg) {
                    // Buscar y ocultar columnas fuera del rango 12 agosto - 5 septiembre
                    const startTargetDate = new Date('2025-08-12');
                    const endTargetDate = new Date('2025-09-05');
                    
                    // Ocultar elementos de fechas fuera del rango
                    const dateHeaders = ganttSvg.querySelectorAll('.date-header, .grid-column');
                    dateHeaders.forEach(header => {
                        const dateText = header.textContent?.trim();
                        if (dateText && dateText.match(/\d{1,2}\s+\w{3}/)) {
                            // Intentar parsear la fecha del header
                            try {
                                const headerDate = new Date(dateText + ' 2025');
                                if (headerDate < startTargetDate || headerDate > endTargetDate) {
                                    header.style.display = 'none';
                                }
                            } catch (e) {
                                // Si no se puede parsear, mantener visible
                            }
                        }
                    });
                }
            }
        });

        const imgData = canvas.toDataURL('image/png');

        // Crear PDF con el área recortada
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const innerW = pageW - margin * 2;
        const innerH = pageH - margin * 2;
        
        // Calcular dimensiones manteniendo proporción
        const pxToMm = (px) => px * 25.4 / 96;
        const imgWmm = pxToMm(canvas.width);
        const imgHmm = pxToMm(canvas.height);
        const scale = Math.min(innerW / imgWmm, innerH / imgHmm);
        const renderW = imgWmm * scale;
        const renderH = imgHmm * scale;
        const x = margin + (innerW - renderW) / 2;
        const y = margin + (innerH - renderH) / 2;

        pdf.addImage(imgData, 'PNG', x, y, renderW, renderH, undefined, 'FAST');
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];

        // Mostrar en ventana o descargar
        if (previewWin) {
            const blob = pdf.output('blob');
            const url = URL.createObjectURL(blob);
            try {
                previewWin.location.href = url;
            } catch (_) {
                pdf.save(`cronograma-cami-${dateStr}.pdf`);
                URL.revokeObjectURL(url);
            }
            setTimeout(() => URL.revokeObjectURL(url), 60_000);
        } else {
            pdf.save(`cronograma-cami-${dateStr}.pdf`);
        }

        exportBtn.disabled = false;
        exportBtn.innerHTML = originalBtnContent;
    } catch (error) {
        console.error('Error al exportar a PDF:', error);
        alert('Hubo un error al generar el PDF. Inténtalo nuevamente.');
        exportBtn.disabled = false;
        exportBtn.innerHTML = originalBtnContent;
    }
}


// --- EVENT LISTENERS ---
const exportBtn = document.getElementById('export-pdf-btn');
if (exportBtn) {
    exportBtn.addEventListener('click', exportGanttAsPDFCropped);
}