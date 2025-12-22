<?php

namespace App\Filament\Resources\Products\Pages;

use App\Enums\ProductVariationTypesEnum;
use Filament\Resources\Pages\EditRecord;
use Filament\Actions\DeleteAction;
use Filament\Schemas\Schema;
use App\Filament\Resources\Products\ProductResource;
use Filament\Support\Icons\Heroicon;
use BackedEnum;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;

class ProductVartiationTypes extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected static ?string $title = 'Variation types';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::NumberedList;

    protected static ?string $navigationLabel = 'Variation Types';

    public function form(Schema $schema): Schema
    {
        return  $schema
            ->components([
                Repeater::make('variationTypes')
                ->label('')
                ->relationship()
                ->collapsible()
                ->defaultItems(1)
                ->addActionLabel('Add new variation type')
                ->columns(2)
                ->columnSpan(2)
                ->schema([
                    TextInput::make('name')
                    ->required(),
                    Select::make('type')
                    ->options(ProductVariationTypesEnum::labels())
                    ->required(),
                    Repeater::make('options')
                    ->relationship()
                    ->collapsible()
                    ->schema([
                         TextInput::make('name')
                         ->columnSpan(2)
                         ->required(),
                         SpatieMediaLibraryFileUpload::make('images')
                         ->image()
                         ->multiple()
                         ->openable()
                         ->panelLayout('grid')
                         ->collection('images')
                         ->reorderable()
                         ->appendFiles()
                         ->preserveFilenames()
                         ->columnSpan(3)
                    ])
                    ->columnSpan(2)
                ])
            ]);
    }
    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
