<?php
// Check if the table should be shown
$hasDimensions = false;
$hasWeight = false;

if (isset($this->product->variant) && !empty($this->product->variant)) {
    $length = (float) $this->product->variant->length;
    $width = (float) $this->product->variant->width;
    $height = (float) $this->product->variant->height;
    $weight = (float) $this->product->variant->weight;

// Dimensions are calculated if at least one parameter is > 0
    $hasDimensions = ($length > 0 || $width > 0 || $height > 0);

// Weight is calculated if > 0
    $hasWeight = $weight > 0;
}

// Show the table only if there are dimensions OR weight
if (($hasDimensions || $hasWeight)) : ?>
    <table class="table table-stripped">
        <?php if ($hasDimensions): ?>
            <tr>
                <td><?php echo JText::_('J2STORE_PRODUCT_DIMENSIONS'); ?></td>
                <td>
<span class="product-dimensions">
<?php echo round($this->product->variant->length, 2); ?>
x <?php echo round($this->product->variant->width, 2); ?>
x <?php echo round($this->product->variant->height, 2); ?>
    <?php echo $this->product->variant->length_title; ?>
</span>
                </td>
            </tr>
        <?php endif; ?>

        <?php if ($hasWeight): ?>
            <tr>
                <td><?php echo JText::_('J2STORE_PRODUCT_WEIGHT'); ?></td>
                <td>
<span class="product-weight">
<?php echo round($this->product->variant->weight, 2); ?>
<?php echo $this->product->variant->weight_title; ?>
</span>
                </td>
            </tr>
        <?php endif; ?>
    </table>
<?php endif; ?>
