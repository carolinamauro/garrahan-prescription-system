Feature: Navegación a Pacientes
  Como usuario
  Quiero poder acceder a la sección de pacientes desde el menú
  Para ver la gestión de pacientes

  Scenario: Ir a la página de Pacientes desde el menú
    Given que estoy en la página principal
    When hago clic en "Pacientes" en el menú
    Then debería navegar a "/patients"
    And debería ver el texto "Administra y visualiza todos los pacientes del sistema"
